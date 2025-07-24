import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";

interface SendMailModalProps {
  questionContent: string;
  answer: string;
  onClose: () => void;
  onSend: (email: string, message: string) => void;
}

export const SendMailModal = ({ questionContent, answer, onClose, onSend }: SendMailModalProps) => {
  const [email, setEmail] = useState("");

  // שליפת המשתמש מהסטור
  const user = useSelector((state: RootState) => state.auth.user);

  const senderName = user?.firstName || "משתמש";
  const senderEmail = user?.email || "לא ידוע";

  const message = `שלום,\n\n${senderName} החליט לשתף אותך בשאלה הזו:\n${questionContent}\n\nהתשובה שלו:\n${answer}\n\nאשמח לקבל תגובה:\n${senderEmail}`;

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
          <button onClick={onClose} className="text-sm text-gray-600 hover:underline">
            ביטול
          </button>
          <button
            onClick={() => onSend(email, message)}
            className="bg-[#64748B] text-white px-4 py-2 rounded"
          >
            שלח מייל
          </button>
        </div>
      </div>
    </Dialog>
  );
};
