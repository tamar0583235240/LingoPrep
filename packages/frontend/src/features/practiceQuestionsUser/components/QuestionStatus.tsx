import { FaSpinner, FaCheckCircle, FaCircle } from "react-icons/fa";

interface QuestionStatusProps {
    value: "not_started" | "in_progress" | "completed";
}

const statuses = [
    {
        value: "not_started",
        label: "לא התחיל",
        color: "bg-gray-200 text-gray-700",
        ring: "ring-gray-400",
        icon: <FaCircle className="text-gray-500" />,
    },
    {
        value: "in_progress",
        label: "בתהליך",
        color: "bg-yellow-200 text-yellow-800",
        ring: "ring-yellow-300",
        icon: <FaSpinner className="text-yellow-600 animate-spin-slow" />,
    },
    {
        value: "completed",
        label: "הושלם",
        color: "bg-green-200 text-green-800",
        ring: "ring-green-400",
        icon: <FaCheckCircle className="text-green-600" />,
    },
];

export const QuestionStatus = ({ value }: QuestionStatusProps) => {
    return (
        <div className="flex flex-col gap-1 mt-3">
            <label className="text-mm font-medium text-[--color-text]">סטטוס:</label>
            <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                    <div
                        key={status.value}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition cursor-default ${status.color} ${
                            value === status.value
                                ? `ring-2 ${status.ring}`
                                : "opacity-70"
                        }`}
                    >
                        {status.icon}
                        {status.label}
                    </div>
                ))}
            </div>
        </div>
    );
};
