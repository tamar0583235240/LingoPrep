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
} from "../reposioty/passwordResetRepository";
import userRepository from "../reposioty/userRepository";
import authRepository from "../reposioty/authRepository";
import sessionRepository from "../reposioty/sessionRepository";
import {
  sendResetEmail,
  sendVerificationCodeEmail,
} from "../utils/emailSender";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "your_refresh_secret";
const TOKEN_EXPIRATION_HOURS = 24;

type CodeData = { code: string; expiresAt: number };
const codesPerEmail = new Map<string, CodeData>();

// ניקוי המפות שפג תוקפן - כל שעה
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of codesPerEmail.entries()) {
    if (data.expiresAt < now) codesPerEmail.delete(email);
  }
}, 60 * 60 * 1000);

export const generateAndSendCode = async (req: Request, res: Response) => {
  const email = req.body.email;
  if (!email)
    return res.status(400).json({ sent: false, message: "Email is required" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 דקות
  codesPerEmail.set(email, { code, expiresAt });

  await sendVerificationCodeEmail(email, `קוד האימות שלך הוא: ${code}`);
  res.status(200).json({ sent: true, message: "הקוד נשלח בהצלחה!" });
};

export const validateCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ error: "Email and code are required" });

  const validCode = codesPerEmail.get(email);
  if (!validCode)
    return res.status(200).json({ valid: false, message: "לא נמצא קוד" });

  if (Date.now() > validCode.expiresAt)
    return res.status(200).json({ valid: false, message: "הקוד פג תוקף" });

  return res.status(200).json({
    valid: code === validCode.code,
    message: code === validCode.code ? "הקוד אומת בהצלחה" : "הקוד שגוי",
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Missing email" });

  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user)
      return res
        .status(200)
        .json({ message: "If email exists, reset link sent" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(
      Date.now() + TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000
    );

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

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ message: "Missing token or password" });

  try {
    const tokenData = await getToken(token);
    if (!tokenData || new Date(tokenData.expires_at) < new Date())
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await userRepository.updateUserPassword(tokenData.user_id, hashedPassword);
    await deleteToken(token);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password error:", error);
    return res.status(500).json({ message: "שגיאת שרת פנימית" });
  }
};

// export const login = async (req: Request, res: Response) => {
//   const { email, password, rememberMe } = req.body;

//   try {
//     const user = await authRepository.login(email, password);
//     if (!user) throw new Error("אימייל או סיסמה שגויים");

//     const sessionId = uuidv4();
//     await sessionRepository.createSession(user.id, sessionId);

//     console.log("🔐 [authController] JWT_SECRET loaded:", JWT_SECRET);
//     console.log("🔐 [authController] REFRESH_SECRET loaded:", REFRESH_SECRET);

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role, sessionId },
//       JWT_SECRET,
//       { expiresIn: rememberMe ? "7d" : "1h" }
//     );

//     const refreshToken = jwt.sign(
//       { id: user.id, email: user.email, role: user.role, sessionId },
//       REFRESH_SECRET,
//       { expiresIn: rememberMe ? "7d" : "2h" }
//     );

//     console.log("✅ טוקן נוצר:", token);
//     console.log("✅ ריפרש טוקן נוצר:", refreshToken);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
//     });

//     res.json({ user, token });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(401).json({ message: error instanceof Error ? error.message : "Login failed" });
//   }
// };
export const login = async (req: Request, res: Response) => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await authRepository.login(email, password);
    if (!user) throw new Error("אימייל או סיסמה שגויים");

    // יצירת sessionId ייחודי
    const sessionId = uuidv4();
    console.log("🔐 יוצר session עבור משתמש:", { userId: user.id, sessionId });

    // שמירת session בדטאבייס
    await sessionRepository.createSession(user.id, sessionId);

    console.log("🔐 [authController] JWT_SECRET loaded:", JWT_SECRET);
    console.log("🔐 [authController] REFRESH_SECRET loaded:", REFRESH_SECRET);

    // הוספת sessionId לטוקן
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, sessionId },
      JWT_SECRET,
      { expiresIn: rememberMe ? "7d" : "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role, sessionId },
      REFRESH_SECRET,
      { expiresIn: rememberMe ? "7d" : "2h" }
    );

    console.log("✅ טוקן נוצר עם sessionId:", {
      sessionId,
      token: token.substring(0, 50) + "...",
    });
    console.log("✅ ריפרש טוקן נוצר:", refreshToken.substring(0, 50) + "...");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
    });

    res.json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(407).json({ message: "לא סופק refresh token" });
  }

  try {
    const userData = jwt.verify(refreshToken, REFRESH_SECRET) as any;
    const user = await userRepository.getUserById(userData.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token: newToken, user });
  } catch (err) {
    return res.status(403).json({ message: "refresh token לא תקין" });
  }
};

// export const logout = async (req: Request, res: Response) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: "Token is missing" });

//   try {
//     const decoded: any = jwt.verify(token, JWT_SECRET);
//     if (decoded?.sessionId) {
//       await sessionRepository.endSession(decoded.sessionId);
//     }
//   } catch (e) {
//     console.error("בעיה בפענוח טוקן ב־logout:", e);
//   }

//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   res.json({ message: "התנתקת בהצלחה" });
// };

// בקובץ authController.ts
// export const logout = async (req: Request, res: Response) => {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: "Token is missing" });

//   try {
//     const decoded: any = jwt.verify(token, JWT_SECRET);
//     console.log("🔐 פענוח טוקן ב-logout:", decoded);

//     if (decoded?.sessionId) {
//       console.log("🔄 מעדכן session logout time עבור sessionId:", decoded.sessionId);
//       await sessionRepository.endSession(decoded.sessionId);
//     }

//     // גם מעדכן את המשתמש לא פעיל
//     if (decoded?.id) {
//       // await authRepository.logout(decoded.id);  // מחקתי
//       console.warn("לא נמצא sessionId בטוקן. לא בוצע עדכון ל־logout_time.");
//     }

//   } catch (e) {
//     console.error("בעיה בפענוח טוקן ב־logout:", e);
//   }

//   res.clearCookie("refreshToken", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   res.json({ message: "התנתקת בהצלחה" });
// };

export const logout = async (req: Request, res: Response) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    console.warn("⚠️ אין טוקן בבקשה להתנתקות.");
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    console.log("🔐 פענוח טוקן ב־logout:", decoded);

    if (decoded?.sessionId) {
      console.log("➡️ קורא ל־endSession עם:", decoded.sessionId);
      await sessionRepository.endSession(decoded.sessionId);
      console.log("✅ logout_time עודכן עבור sessionId:", decoded.sessionId);
    } else {
      console.warn("⚠️ לא נמצא sessionId בטוקן. לא בוצע עדכון ל־logout_time.");
    }
  } catch (e) {
    console.error("❌ שגיאה בפענוח טוקן ב־logout:", e);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "התנתקת בהצלחה" });
};

const pendingSignups = new Map<
  string,
  { userData: Users; code: string; expiresAt: number }
>();

export const requestSignup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "חסרים פרטים חובה" });
  }

  const existing = (await userRepository.getAllUsers()).find(
    (u) => u.email === email
  );
  if (existing) {
    return res.status(409).json({ message: "אימייל כבר קיים" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // שמירת הבקשה הרשמה עם כל הפרטים
  pendingSignups.set(email, {
    userData: {
      id: uuidv4(),
      firstName,
      lastName,
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
      userSessions: [],
      userReminderSettings: [],
      // הוספת השדות החסרים:
      slug: null,
      contentReports: [],
      experienceThanks: [],
      interviewExperiences: [],
      profiles: null, // או undefined אם הטיפוס מאפשר
      workExperiences: [],
    },
    code,
    expiresAt,
  });
  

  await sendVerificationCodeEmail(email, `קוד האימות להרשמה שלך הוא: ${code}`);

  res.status(200).json({
    message: "קוד אימות נשלח למייל. נא הזן את הקוד כדי להשלים הרשמה.",
  });
};

export const confirmSignup = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: "אימייל וקוד דרושים" });
  }

  const pending = pendingSignups.get(email);
  if (!pending) {
    return res.status(400).json({ message: "לא נמצאה בקשה הרשמה למייל זה." });
  }

  if (pending.expiresAt < Date.now()) {
    pendingSignups.delete(email);
    return res.status(400).json({ message: "הקוד פג תוקף. נא לבקש קוד חדש." });
  }

  if (pending.code !== code) {
    return res.status(400).json({ message: "הקוד שגוי." });
  }

  await authRepository.signup(pending.userData);
  pendingSignups.delete(email);

  const token = jwt.sign(
    {
      id: pending.userData.id,
      email: pending.userData.email,
      role: pending.userData.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({ user: pending.userData, token });
};

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  // מביאה את כל המשתמשים מה־ DB
  // שומרת את המשתמש (אם קיים) במשתנה existing.
  const existing = (await userRepository.getAllUsers()).find(
    (u) => u.email === email
  );
  if (existing) {
    return res.status(409).json({ message: "אימייל כבר קיים" });
  }

  // הצפנה של סיסמה
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser: Users = {
    id: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    role: "user",
    isActive: true,
    createdAt: new Date(),
    
    // שדות חובה שאולי נשכחו:
    slug: null, // או מחולל slug אם נדרש
  
    answers: [],
    feedbacks: [],
    passwordResetTokens: [],
    sharedRecordings: [],
    userSessions: [],
    userReminderSettings: [],
    contentReports: [],
    experienceThanks: [],
    interviewExperiences: [],
    profiles: null,
    workExperiences: [],
  };
  

  await authRepository.signup(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(201).json({ user: newUser, token });
};

const client = new OAuth2Client();

export const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const { payload } = req.body;
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
      user = await userRepository.insertUser({
        id: uuidv4(),
        first_name: googleUser.given_name ?? "",
        last_name: googleUser.family_name ?? "",
        email: googleUser.email,
        phone: null,
        role: "student",
        is_active: true,
        password: "",
        created_at: new Date(),
      });
    } else {
      await userRepository.updateActiveUser(user.id);
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Google Auth error:", err);
    return res.status(500).json({ message: "Google authentication failed" });
  }
};
