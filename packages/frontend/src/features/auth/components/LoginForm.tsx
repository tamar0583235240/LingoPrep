
import React, { useState } from "react";
import { useLoginMutation } from "../../../shared/api/authApi";
import { useAppDispatch } from "../../../shared/hooks/reduxHooks";
import { loginSuccess, loginStart, loginFailure } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { CardSimple } from "../../../shared/ui/card";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import GoogleLoginButton from "./GoogleAuthButton";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { Heading2, Paragraph } from "../../../shared/ui/typography";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isError, isSuccess, error, data, isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setErrorMessage("");
    try {
      const res = await login({ email, password, rememberMe}).unwrap();
      setTempEmail(email);
      setShowValidation(true);
      successfulLogin(res);
    } catch (err: any) {
      const message = err?.data?.message || "שגיאה בהתחברות";
      dispatch(loginFailure(message));
      setErrorMessage(message);
      setShowValidation(false);
    }
  };

  const successfulLogin = (res: any) => {
    if (res?.user && res?.token) {
      dispatch(loginSuccess({ user: res.user, token: res.token }));
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-background">
      <CardSimple className="w-full max-w-md p-6 animate-fade-in space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Heading2 className="text-center">התחברות</Heading2>

          {/* Email */}
          <div className="relative">
            <Input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pr-12"
              required
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <IconWrapper size="sm" color="muted">
                <FaEnvelope />
              </IconWrapper>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-12"
              required
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <IconWrapper size="sm" color="muted">
                <FaLock />
              </IconWrapper>
            </div>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
              aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-background"
              />
              זכור אותי
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-primary-dark hover:underline"
            >
              שכחתי סיסמה
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" isLoading={isLoading} fullWidth>
            התחבר
          </Button>

          {/* Feedback */}
          {errorMessage && (
            <Paragraph className="text-danger text-center text-sm">
              {errorMessage}
            </Paragraph>
          )}
          {isSuccess && showValidation && (
            <Paragraph className="text-success text-center text-sm">
              התחברת בהצלחה!
            </Paragraph>
          )}

          {/* Divider */}
          <div className="border-t border-border my-2" />

          {/* Google Login */}
          <div className="flex flex-col items-center gap-2">
            <Paragraph className="text-sm">או התחבר עם:</Paragraph>
            <GoogleLoginButton />
          </div>

          {/* Signup link */}
          <Paragraph className="text-sm text-center mt-4">
            עדיין לא רשום?{" "}
            <a href="/signup" className="text-primary-dark hover:underline">
              הרשם
            </a>
          </Paragraph>
        </form>
      </CardSimple>
    </div>
  );
}
export default LoginForm;
