
import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../../shared/hooks/reduxHooks";
import { loginSuccess } from "../store/authSlice";
import GoogleAuthButton from "./GoogleAuthButton";
import { CardSimple } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { useNavigate } from "react-router-dom";
import { IconWrapper } from "../../../shared/ui/IconWrapper";
import { Heading2, Paragraph } from "../../../shared/ui/typography";
import { FaEye, FaEyeSlash, FaPlusCircle } from "react-icons/fa";
import {
  useSignupRequestMutation,
  useSignupConfirmMutation,
} from "../../../shared/api/authApi";
import { ToggleSwitch } from "../../../shared/ui/ToggleSwitch";
import { TagInput } from "../../../shared/ui/TagInput";
import { Spinner } from "../../../shared/ui/spiner";
import { SectionWrapper } from "../../../shared/ui/SectionWrapper";
import { ProgressCircle } from "../../../shared/ui/ProgressCircle";
import { ProgressBar } from "../../../shared/ui/ProgressBar";
import { EditableListItem } from "../../../shared/ui/EditableListItem";
import { EmptyState } from "../../../shared/ui/EmptyState";

export default function SignupForm() {
 
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "verify">("form");
 

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
   
  });

  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const code = codeDigits.join("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccessMsg, setIsSuccessMsg] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [signupRequest, { isLoading: isRequesting }] = useSignupRequestMutation();
  const [signupConfirm, { isLoading: isConfirming }] = useSignupConfirmMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d{6}$/.test(paste)) {
      setCodeDigits(paste.split(""));
      inputsRef.current[5]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      const newDigits = [...codeDigits];
      newDigits[index - 1] = "";
      setCodeDigits(newDigits);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSuccessMsg(false);

    try {
      if (step === "form") {
        const res = await signupRequest(form).unwrap();
        setMessage(res.message || "קוד נשלח למייל");
        setIsSuccessMsg(true);
        setStep("verify");
      } else if (step === "verify") {
        if (code.length !== 6) {
          setMessage("נא להזין קוד בן 6 ספרות.");
          return;
        }
        const res = await signupConfirm({ email: form.email, code }).unwrap();
        dispatch(loginSuccess({ user: res.user, token: res.token }));
        setMessage("ההרשמה הושלמה בהצלחה!");
        setIsSuccessMsg(true);
        navigate("/home");
      }
    } catch (err: any) {
      setMessage(err?.data?.message || "אירעה שגיאה. נסה שנית.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <CardSimple className="max-w-md w-full p-6 space-y-6 animate-fade-in">
        <Heading2 className="text-center">הרשמה</Heading2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === "form" && (
            <>
              <Input name="first_name" placeholder="שם פרטי" value={form.first_name} onChange={handleChange} required />
              <Input name="last_name" placeholder="שם משפחה" value={form.last_name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} required />
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="סיסמה"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pr-12"
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                  <IconWrapper size="sm" color="muted" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </IconWrapper>
                </div>
              </div>
              <Input name="phone" placeholder="טלפון (אופציונלי)" value={form.phone} onChange={handleChange} />
            </>
          )}

          {step === "verify" && (
            <>
              <Paragraph className="text-sm text-center">
                קוד אימות נשלח למייל: <b>{form.email}</b>
              </Paragraph>

              <div className="flex justify-between gap-2 text-center" dir="ltr">
                {codeDigits.map((digit, i) => (
                  <input
                   key={i}
                   ref={(el: HTMLInputElement | null) => {
                   inputsRef.current[i] = el;
                  }}

                    value={digit}
                    onChange={(e) => handleDigitChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ))}
              </div>

              <Button type="button" variant="ghost" onClick={() => signupRequest(form)} disabled={isRequesting} className="w-full">
                שלח קוד מחדש
              </Button>
            </>
          )}

          <Button type="submit" isLoading={isRequesting || isConfirming} fullWidth>
            {step === "form" ? "הרשם" : "אמת קוד"}
          </Button>

          {message && (
            <Paragraph className={`text-sm text-center ${isSuccessMsg ? "text-success" : "text-danger"}`}>
              {message}
            </Paragraph>
          )}

          {step === "form" && (
            <div className="pt-2">
              <Paragraph className="text-center text-sm">או הרשם עם:</Paragraph>
              <div className="pt-2 flex justify-center">
                <GoogleAuthButton />
              </div>
            </div>
          )}
     


        </form>
      </CardSimple>
      
    </div>
  );
}
