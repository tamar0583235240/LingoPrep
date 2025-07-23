// shared/ui/TaskEditModal.tsx
import * as React from "react";

export const CATEGORY_OPTIONS = [
  { label: "סימולציה", value: "simulation" },
  { label: "קריאה", value: "reading" },
  { label: "שיתוף", value: "sharing" },
  { label: "כללי", value: "general" },
];

export const STATUS_OPTIONS = [
  { label: "ממתין", value: "pending" },
  { label: "הושלם", value: "completed" },
];

export type TaskEditModalProps = {
  task: {
    id: string;
    title: string;
    description: string;
    startDatetime: string;
    durationMinutes: number;
    category: string;
    status: string;
    reminderMinutesBefore: number | null;
    isPublic: boolean;
  };
  onSave: (task: TaskEditModalProps["task"]) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
  isNew?: boolean;
};

const toDatetimeLocal = (isoString: string) => {
  const date = new Date(isoString);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};



export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  task,
  onSave,
  onDelete,
  onClose,
  isNew = false,
}) => {
  const [localTask, setLocalTask] = React.useState({ ...task });

  const handleChange = (field: keyof typeof localTask, value: any) => {
    setLocalTask({ ...localTask, [field]: value });
  };

  const handleSave = () => {
    onSave(localTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {isNew ? "יצירת משימה חדשה" : "עריכת משימה"}
          </h2>
          {!isNew && onDelete && (
            <button
              onClick={() => onDelete(localTask.id)}
              className="text-red-600 hover:text-red-800 font-bold"
              title="מחיקת משימה"
            >
              מחיקה
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="כותרת"
          value={localTask.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full mb-2 border rounded px-2 py-1"
        />

        <textarea
          placeholder="תיאור"
          value={localTask.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full mb-2 border rounded px-2 py-1"
          rows={3}
        />

<input
  type="datetime-local"
  value={toDatetimeLocal(localTask.startDatetime)}
  onChange={(e) => handleChange("startDatetime", e.target.value)}
  className="w-full mb-2 border rounded px-2 py-1"
/>



        <input
          type="number"
          placeholder="משך (בדקות)"
          value={localTask.durationMinutes}
          onChange={(e) => handleChange("durationMinutes", Number(e.target.value))}
          className="w-full mb-2 border rounded px-2 py-1"
        />

        <select
          value={localTask.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full mb-2 border rounded px-2 py-1"
        >
          <option value="">בחר קטגוריה</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={localTask.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full mb-2 border rounded px-2 py-1"
        >
          <option value="">בחר סטטוס</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="תזכורת (בדקות לפני)"
          value={localTask.reminderMinutesBefore ?? ""}
          onChange={(e) =>
            handleChange(
              "reminderMinutesBefore",
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="w-full mb-4 border rounded px-2 py-1"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            ביטול
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            שמור
          </button>
        </div>
      </div>
    </div>
  );
};
