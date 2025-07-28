// import React, { useEffect, useState } from "react";
import {
  useGenerateCodeMutation,
  useValidateCodeMutation,
} from "../../../shared/api/verifyCodeApi";
import { Button } from "../../../shared/ui/button";
import { Input } from "../../../shared/ui/input";
import { CardSimple } from "../../../shared/ui/cardSimple";

const CodeVerificationScreen = ({ email, onSuccess }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const [generateAndSendCode] = useGenerateCodeMutation();
  const [verifyCode] = useValidateCodeMutation();

  const sendCodeToEmail = async () => {
    if (!email) {
      setMessage("אין אפשרות לשלוח קוד לאימייל.");
      return;
    }
    try {
      const res = await generateAndSendCode({ email }).unwrap();
      if (!res?.isSent) {
        setIsCodeSent(false);
        setMessage("לא הצלחנו לשלוח את הקוד, נסה שוב.");
      } else {
        setMessage("קוד נשלח לאימייל שלך.");
        setIsCodeSent(true);
      }
    } catch (error) {
      console.error("Error sending code:", error);
      setMessage("שגיאה בשליחת הקוד. נא לנסות שנית.");
    }
  };

  useEffect(() => {
    if (!email) {
      setMessage("נא להזין אימייל תקין.");
      setIsCodeSent(false);
      return;
    }
    if (!isCodeSent) sendCodeToEmail();
  }, []);

  const validateCode = async () => {
    if (code.length !== 6) {
      setMessage("נא להזין קוד בן 6 ספרות.");
      return;
    }
    try {
      const response = await verifyCode({ email, code }).unwrap();
      if (response && response.valid) {
        setMessage(response.message || "הקוד תקין. ניתן להמשיך.");
        onSuccess();
      } else {
        setMessage(response?.message || "הקוד לא תקין. נא לנסות שנית.");
      }
    } catch (e) {
      console.error("Error validating code:", e);
      setMessage("שגיאה באימות הקוד. נא לנסות שוב.");
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <CardSimple className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-900 text-center">
          הזן את קוד האימות שנשלח למייל שלך
        </h3>

        <Button
          variant="outline"
          className="w-full"
          onClick={sendCodeToEmail}
          disabled={isCodeSent === false}
        >
          לא קיבלת קוד? שלח מחדש
        </Button>

        <div className="relative">
          <Input
            type={showCode ? "text" : "password"}
            maxLength={6}
            pattern="\d{6}"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="******"
            className="pr-16 text-center tracking-widest text-lg font-mono"
          />
          <button
            type="button"
            onClick={() => setShowCode((s) => !s)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
            aria-label={showCode ? "הסתר קוד" : "הצג קוד"}
          >
            {showCode ? "הסתר" : "הצג"}
          </button>
        </div>

        {message && (
          <p className="text-center text-sm text-red-600 select-text">{message}</p>
        )}

        <Button className="w-full" onClick={validateCode}>
          אשר קוד
        </Button>
      </CardSimple>
    </div>
  );
};

export default CodeVerificationScreen;
