import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { OAuth2Client } from "google-auth-library";

import { Users } from "../interfaces/entities/Users";
import {
  createToken,
  getToken,
  deleteToken,
  updateToken,
} from "../reposioty/passwordResetRepository";
import refreshTokensRepository from "../reposioty/refreshTokensRepository";
import userRepository from "../reposioty/userRepository";
import authRepository from "../reposioty/authRepository";
import {
  sendResetEmail,
  sendVerificationCodeEmail,
} from "../utils/emailSender";
import { generateUniqueSlug } from "../utils/generateSlug";
import { stat } from "fs";

// Map לשמירת קודי אימות זמניים
type CodeData = { code: string; expiresAt: number };
const codesPerEmail = new Map<string, CodeData>();

// ניקוי קודים שפג תוקפם כל שעה
const cleanExpiredCodes = () => {
  const now = Date.now();
  for (const [email, data] of codesPerEmail.entries()) {
    if (data.expiresAt < now) {
      codesPerEmail.delete(email);
    }
  }
};
setInterval(cleanExpiredCodes, 60 * 60 * 1000);

// יצירת ושליחת קוד אימות למייל
export const generateAndSendCode = async (req: Request, res: Response) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ sent: false, message: "Email is required" });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 דקות תוקף
  codesPerEmail.set(email, { code, expiresAt });

  try {
    await sendVerificationCodeEmail(email, `קוד האימות שלך הוא: ${code}`);
    return res.status(200).json({ sent: true, message: "הקוד נשלח בהצלחה!" });
  } catch (error) {
    console.error("Error sending verification code email:", error);
    return res.status(500).json({ sent: false, message: "שגיאת שרת" });
  }
};

// אימות קוד שהתקבל מהמשתמש
export const validateCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  const validCode = codesPerEmail.get(email);
  if (!validCode) {
    return res.status(200).json({
      valid: false,
      message: "שגיאה. לא נמצא בקשה לקבלת קוד למייל הזה. אנא נסה שנית.",
    });
  }
  if (Date.now() > validCode.expiresAt) {
    codesPerEmail.delete(email);
    return res
      .status(200)
      .json({ valid: false, message: "הקוד פג תוקף. אנא בקש קוד חדש." });
  }
  if (code === validCode.code) {
    codesPerEmail.delete(email); // אפשר למחוק את הקוד לאחר אימות מוצלח
    return res.status(200).json({ valid: true, message: "הקוד אומת בהצלחה" });
  } else {
    return res
      .status(200)
      .json({ valid: false, message: "הקוד שגוי. אנא נסה שנית." });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "your_REFRESH_TOKEN_SECRET";

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Missing email" });

  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      // מחזיר בהצלחה כדי לא לחשוף האם האימייל במערכת
      return res
        .status(200)
        .json({ message: "If email exists, reset link sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await createToken(user.id, token, expiresAt);
    await sendResetEmail(email, token);

    return res
      .status(200)
      .json({ message: "If email exists, reset link sent" });
  } catch (error) {
    console.error("Forgot Password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// איפוס סיסמה לפי טוקן חדש וסיסמה חדשה
export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ message: "Missing token or password" });

  try {
    const tokenData = await getToken(token);

    if (!tokenData) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }

    const SALT_ROUNDS = 10;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await userRepository.updateUserPassword(tokenData.user_id, hashedPassword);
    await deleteToken(token);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login with email and password
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await userRepository.getUserByEmailAndPassword(
      email,
      password
    );
    console.log("USER RETURNED FROM login():", user);

    if (!user) {
      return res.status(401).json({ message: "אימייל או סיסמה שגויים" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: rememberMe ? "7d" : "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: rememberMe ? "7d" : "2h" }
    );

    await refreshTokensRepository.createToken(
      user.id,
      refreshToken,
      new Date(
        Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000)
      )
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
    });

    await userRepository.updateActiveUser(user.id);

    res.json({ user, token: accessToken });
  } catch (error: Error | any) {
    res.status(500).json({ message: error.message });
  }
};

//refresh token endpoint
export const refreshToken = async (req: Request, res: Response) => {
  const existingToken = req.cookies.refreshToken;
  if (!existingToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const payload = jwt.verify(existingToken, REFRESH_TOKEN_SECRET) as any;
    const user = await userRepository.getUserById(payload.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedToken = await refreshTokensRepository.getToken(
      user.id,
      existingToken
    );
    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    if(storedToken.expires_at < Date.now()){
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    await refreshTokensRepository.deleteToken(existingToken);

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const newRefreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    await refreshTokensRepository.refreshToken(
      user.id,
      newRefreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ token: accessToken, user });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// logout endpoint
export const logout = async (req: Request, res: Response) => {
  await refreshTokensRepository.deleteToken(req.cookies.refreshToken);
  await authRepository.logout(req.body.user.id);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "התנתקת בהצלחה" });
};

// Map to save pending signups
const pendingSignups = new Map<
  string,
  { userData: Users; code: string; expiresAt: number }
>();

// signup request sending verification code
export const requestSignup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, phone, password } = req.body;

  if (!email || !password || !first_name || !last_name) {
    return res.status(400).json({ message: "חסרים פרטים חובה" });
  }

  const existing = (await userRepository.getAllUsers()).find(
    (u: Users) => u.email === email
  );
  if (existing) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  pendingSignups.set(email, {
    userData: {
      id: userId,
      firstName: first_name,
      lastName: last_name,
      slug: null,
      email,
      phone,
      password: hashedPassword,
      role: "student",
      isActive: true,
      answers: [],
      feedbacks: [],
      passwordResetTokens: [],
      createdAt: new Date(),
      sharedRecordings: [],
      contentReports: [],
      experienceThanks: [],
      interviewExperiences: [],
      userReminderSettings: [],
      userSessions: [],
      userActivities: [],
      workExperiences: [],
      profiles: {
        id: uuidv4(),
        userId: userId, // This will be updated after user creation
        imageUrl: null,
        location: null,
        externalLinks: null,
        status: null,
        preferredJobType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: false, // This w // This will be set after user creation
        user: {} as Users,
      },
    },
    code,
    expiresAt,
  });

  await sendVerificationCodeEmail(email, `קוד האימות להרשמה שלך הוא: ${code}`);

  res.status(200).json({
    message: "קוד אימות נשלח למייל. נא הזן את הקוד כדי להשלים הרשמה.",
  });
};

// confirm signup with verification code
export const confirmSignup = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code)
    return res.status(400).json({ message: "אימייל וקוד דרושים" });

  const pending = pendingSignups.get(email);
  if (!pending)
    return res.status(400).json({ message: "לא נמצאה בקשה הרשמה למייל זה." });

  if (pending.expiresAt < Date.now()) {
    pendingSignups.delete(email);
    return res
      .status(400)
      .json({ message: "Code expired. Please request a new code." });
  }

  if (pending.code !== code)
    return res.status(400).json({ message: "הקוד שגוי." });

  const user = pending.userData;
  await authRepository.signup(user);
  pendingSignups.delete(email);

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  await refreshTokensRepository.createToken(
    user.id,
    refreshToken,
    new Date(Date.now() + 2 * 60 * 60 * 1000)
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 2 * 60 * 60 * 1000,
  });

  await userRepository.updateActiveUser(pending.userData.id);
  const { id, role, firstName, lastName } = pending.userData;
  res.status(201).json({ user: {id, email, role, first_name: firstName, last_name: lastName}, token: accessToken });
};

export const signup = async (req: Request, res: Response) => {
  const { first_name, last_name, email, phone, password } = req.body;

  const existing = (await userRepository.getAllUsers()).find(
    (user: Users) => user.email === email
  );
  if (existing) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const slug = await generateUniqueSlug(first_name, last_name);

  const newUser: Users = {
    id: uuidv4(),
    firstName: first_name,
    lastName: last_name,
    slug,
    email,
    phone,
    password: hashedPassword,
    role: "student",
    isActive: true,
    answers: [],
    feedbacks: [],
    passwordResetTokens: [],
    sharedRecordings: [],
    createdAt: new Date(),
    contentReports: [],
    experienceThanks: [],
    interviewExperiences: [],
    userReminderSettings: [],
    userSessions: [],
    userActivities: [],
    workExperiences: [],
    profiles: {
      id: uuidv4(),
      userId: uuidv4(), // This will be updated after user creation
      imageUrl: null,
      location: null,
      externalLinks: null,
      status: null,
      preferredJobType: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      user: {} as Users, // This will be set after user creation
    },
  };

  await authRepository.signup(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({ user: newUser, token });

  await authRepository.signup(newUser);

  res.status(201).json({ user: newUser, token });
};

const client = new OAuth2Client();

// אימות באמצעות גוגל OAuth
export const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const { payload, rememberMe } = req.body;
    if (!payload?.credential) {
      return res.status(400).json({ message: "Missing Google credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: payload.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const googleUser = ticket.getPayload();
    if (!googleUser?.email) {
      return res
        .status(400)
        .json({ message: "Invalid token or email not found" });
    }

    let user = await userRepository.getUserByEmail(googleUser.email);

    if (!user) {
      const first_name = googleUser.given_name ?? "";
      const last_name = googleUser.family_name ?? "";
      const slug = await generateUniqueSlug(first_name, last_name);

      user = await userRepository.insertUser({
        id: uuidv4(),
        first_name,
        last_name,
        email: googleUser.email,
        phone: null,
        role: "student",
        is_active: true,
        password: "",
        created_at: new Date(),
        slug,
      });
    }

    if (!user) {
      return res
        .status(500)
        .json({ message: "Failed to create or retrieve user" });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: rememberMe ? "7d" : "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      REFRESH_TOKEN_SECRET,
      { expiresIn: rememberMe ? "7d" : "2h" }
    );

    await refreshTokensRepository.createToken(
      user.id,
      refreshToken,
      new Date(
        Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000)
      )
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
    });
    await userRepository.updateActiveUser(user.id);

    return res.status(200).json({ user, token: accessToken });
  } catch (err) {
    console.error("Google Auth error:", err);
    return res.status(500).json({ message: "Google authentication failed" });
  }
};
