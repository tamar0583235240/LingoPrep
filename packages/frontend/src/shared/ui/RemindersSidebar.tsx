import React, { useState, useEffect } from "react";
import { cn } from "../utils/cn";
import { FaRegBell, FaCheck } from "react-icons/fa";

interface Reminder {
    id: string;
    subject: string;
    status: "pending" | "done";
}

interface RemindersSidebarProps {
    open: boolean;
    onClose: () => void;
    reminders: Reminder[];
    onDone: (id: string) => void;
}

export const RemindersSidebar: React.FC<RemindersSidebarProps> = ({
    open,
    onClose,
    reminders,
    onDone,
}) => {
    return (
        <div
            className={cn(
                "fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50 transition-transform duration-300",
                open ? "translate-x-0" : "translate-x-full"
            )}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
                <span className="text-lg font-bold text-gray-800">תזכורות</span>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black transition"
                >
                    ✖
                </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
                {reminders.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">אין תזכורות כרגע</div>
                ) : (
                    reminders.map((reminder) => (
                        <div key={reminder.id} className="flex items-start justify-between mb-4 p-3 bg-gray-100 rounded border border-[rgb(0,184,148)] shadow-sm hover:shadow-md transition">
                            <div className="flex-1">
                                <div className="font-semibold break-words">{reminder.subject}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                    סטטוס: {reminder.status === "pending" ? "ממתין" : "בוצע"}
                                </div>
                            </div>

                            {reminder.status === "pending" && (
                                <button
                                    onClick={() => onDone(reminder.id)}
                                    className="ml-2 w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-600
                                      hover:text-white hover:bg-[rgb(0,184,148)] flex items-center justify-center transition"
                                    title="סמן כבוצע"
                                >
                                    {/* <span className="text-lg leading-none">✔</span> */}
                                    <FaCheck className="text-sm" />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export const ReminderBell: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [reminders, setReminders] = useState<Reminder[]>([]);




    useEffect(() => {
        fetch("/api/reminders/")
            .then((res) => res.json())
            
            .then((data) => {
                
                console.log("📥 נשלפו תזכורות מהשרת:", data);
                console.log("🔔 reminders from API:", data);

                setReminders(data);
            })
            .catch((err) => {
                console.error("❌ שגיאה בעת שליפת תזכורות:", err);
            });
    }, []);



const handleDone = (id: string) => {
      console.log("🆔 סימון תזכורת כבוצע - ID:", id);

  fetch(`/api/reminders/${id}/done`, { method: "POST" }).then(() =>
    setReminders((prev) => prev.filter((r) => r.id !== id))
  );
};

    return (
        <>
            <button
                className="relative text-xl p-2 hover:bg-gray-200 rounded-full text-gray-800 border border-gray-300"
                onClick={() => setOpen(true)}
                title="תזכורות"
            >
                <FaRegBell />
                {reminders.length > 0 && (

                    <span className="absolute -top-1 -right-1 transform translate-x-1/3 -translate-y-1/3
                         bg-red-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
                        {reminders.length}
                    </span>
                )}
            </button>
            <RemindersSidebar
                open={open}
                onClose={() => setOpen(false)}
                reminders={reminders}
                onDone={handleDone}
            />
        </>
    );
};
