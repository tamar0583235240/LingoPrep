import { useEffect, useState } from "react";
import {
  useGenerateCodeMutation,
  useValidateCodeMutation,
} from "../../../shared/api/verifyCodeApi";

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
    console.log(`Sending code to email: ${email}`);
    try {
      const res = await generateAndSendCode({ email }).unwrap();
      if (!res?.isSent) {
        setIsCodeSent(false);
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
    setIsCodeSent(true);
  }, []);

  const validateCode = async () => {
    if (code.length !== 6) {
      setMessage("נא להזין קוד בן 6 ספרות.");
    } else {
      try {
        const response = await verifyCode({ email, code }).unwrap();
        console.log("Response from validateCode:", response);

        if (response && response.valid) {
          setMessage(response.message || "הקוד תקין. ניתן להמשיך.");
          onSuccess();
        } else {
          setMessage(response?.message || "הקוד לא תקין. נא לנסות שנית.");
        }
      } catch (e) {
        console.error("Error validating code:", e);
      }
    }
  };

  return (
    <>
      <div>
        <CardSimple className="max-w-md w-full mx-auto p-6 space-y-4">
          <h3>הזן את קוד האימות שנשלח למייל שלך</h3>

          <Button onClick={() => sendCodeToEmail()}>
            לא קיבלת קוד? שלח מחדש
          </Button>

          <div>
            <Input
              type={showCode ? "text" : "password"}
              maxLength={6}
              pattern="\d{6}"
              value={code}
              onChange={(e) => setCode(e.target.value.slice(0, 6))}
              InputMode="numeric"
              autoComplete="one-time-code"
            />
            <span
              onClick={() => setShowCode((s) => !s)}
              title={showCode ? "הסתר קוד" : "הצג קוד"}
            >
              {showCode ? "הסתר" : "הצג"}
            </span>
          </div>

          {message && <p>{message}</p>}

          <Button onClick={validateCode}>אשר קוד</Button>
        </CardSimple>
      </div>
    </>
  );
};

export default CodeVerificationScreen;
