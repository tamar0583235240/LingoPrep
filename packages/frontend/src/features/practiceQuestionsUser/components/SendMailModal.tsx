import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";

interface SendMailModalProps {
  questionContent: string;
  answer: string;
  onClose: () => void;
  onSend: (email: string, question: string, answer: string, senderName: string, senderEmail: string) => void;
}

export const SendMailModal = ({ questionContent, answer, onClose, onSend }: SendMailModalProps) => {
  const [email, setEmail] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const senderName = user?.first_name || "משתמש";
  const senderEmail = user?.email || "לא ידוע";

  const message = `שלום,

${senderName} רוצה לשתף אותך בשאלה שהיא ענתה עליה:

שאלה:
${questionContent}

תשובה:
${answer}

ניתן להגיב למייל של המשתמש:
${senderEmail}`;

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="bg-white rounded p-6 z-10 max-w-md w-full text-right">
        <Dialog.Title className="text-lg font-bold mb-2">שליחת שאלה במייל</Dialog.Title>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">כתובת מייל של החבר</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">הודעה</label>
          <textarea
            value={message}
            readOnly
            className="w-full border p-2 rounded"
            rows={6}
          />
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">ביטול</button>
          <button
            onClick={() => onSend(email, questionContent, answer, senderName, senderEmail)}
            className="bg-[#64748B] text-white px-4 py-2 rounded"
            disabled={!email}
          >
            שלח מייל
          </button>
        </div>
      </div>
    </Dialog>
  );
};
