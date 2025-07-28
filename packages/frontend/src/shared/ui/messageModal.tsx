import { X } from "lucide-react";
import { ReactNode } from "react";

type MessageModalProps = {
    title: string;
    message: string | ReactNode;
    onClose: () => void;
};

export default function MessageModal({ title, message, onClose }: MessageModalProps) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-card w-full max-w-md text-right">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="סגור"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="text-left text-gray-600 mt-2">
                    {typeof message === "string" ? <p>{message}</p> : message}
                </div>
            </div>
        </div>
    );
}
MessageModal.displayName = "MessageModal";
