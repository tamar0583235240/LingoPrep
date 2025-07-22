import React from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  onClose?: () => void;
  icon?: React.ReactNode;
}

const colors = {
  success: {
    border: "border-[--color-primary]",
    bg: "bg-white",
    text: "text-[--color-primary-dark]"
  },
  error: {
    border: "border-red-300",
    bg: "bg-white",
    text: "text-red-500"
  }
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "success",
  onClose,
  icon
}) => {
  const color = colors[type];

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2
        z-50 max-w-xs w-full shadow-lg rounded-lg border
        px-4 py-3 flex items-center gap-2 animate-fade-in
        ${color.bg} ${color.border} ${color.text}
      `}
      role="alert"
      style={{ minWidth: 280 }}
    >
      {icon && <span className="mr-1">{icon}</span>}
      <span className="flex-1 font-semibold">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-xl font-bold leading-none focus:outline-none text-gray-400 hover:text-gray-700"
          aria-label="סגור"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Notification;
