import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { EditableListItem } from "../../../shared/ui/EditableListItem";
import { Input } from "../../../shared/ui/input";
import { GridContainer } from "../../../shared/ui/GridContainer";
import {
  useGetPracticeTasksQuery,
  useCreatePracticeTaskMutation,
  useUpdatePracticeTaskMutation,
  useDeletePracticeTaskMutation,
} from "../../../features/planner/services/practiceTasksApi";
import { PracticeTasks, PracticeTaskInput } from "../../planner/types/PracticeTasks";

const STATUS_OPTIONS = [
  { label: "ממתין", value: "pending" },
  { label: "הושלם", value: "completed" },
];

const CATEGORY_OPTIONS = [
  { label: "סימולציה", value: "simulation" },
  { label: "קריאה", value: "reading" },
  { label: "שיתוף", value: "sharing" },
  { label: "כללי", value: "general" },
];

export const toDatetimeLocal = (dateInput: string | Date): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};





type PracticeTaskItem = {
  id: string;
  title: string;
  description: string;
  start_datetime: string;
  duration_minutes: number;
  category: string;
  reminder_minutes_before: number | null;
  is_public: boolean;
  status: string;
};

export const PracticeTasksTab = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { data = [], refetch } = useGetPracticeTasksQuery({ user_id: userId! }, { skip: !userId });

  const [createTask] = useCreatePracticeTaskMutation();
  const [updateTask] = useUpdatePracticeTaskMutation();
  const [deleteTask] = useDeletePracticeTaskMutation();

  const [editingId, setEditingId] = React.useState<string | null>(null);

  const mapFromServer = (task: PracticeTasks): PracticeTaskItem => ({
    id: task.id,
    title: task.title,
    description: task.description ?? "",
start_datetime: task.startDatetime ? toDatetimeLocal(task.startDatetime) : "",
    duration_minutes: task.durationMinutes ?? 0,
    category: task.category ?? "",
    reminder_minutes_before: task.reminderMinutesBefore ?? null,
    is_public: task.status === "public",
    status: task.status ?? "pending",
  });

  const mapToServer = (item: PracticeTaskItem): PracticeTaskInput => {
    if (!userId) {
      throw new Error("User ID is missing");
    }

    return {
      user_id: userId,
      title: item.title,
      description: item.description,
      start_datetime: item.start_datetime,
      duration_minutes: item.duration_minutes,
      category: item.category,
      reminder_minutes_before: item.reminder_minutes_before,
      status: item.status,
    };
  };

  const handleSave = async (id: string, updated: PracticeTaskItem) => {
    try {
      if (id === "new") {
        await createTask(mapToServer(updated)).unwrap();
      } else {
        await updateTask({ id: String(id), data: mapToServer(updated) }).unwrap();
      }
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteTask(String(id)).unwrap();
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleToggleVisibility = async (id: string | number) => {
    const item = data.find((x) => x.id === id);
    if (!item) return;
    const payload = {
      ...mapToServer(mapFromServer(item)),
      status: item.status === "public" ? "private" : "public",
    };
    try {
      await updateTask({ id: String(id), data: payload }).unwrap();
      refetch();
    } catch (err) {
      console.error("Toggle visibility failed:", err);
    }
  };

  return (
    <GridContainer maxWidth="sm" padding="px-4" mt="mt-10" mb="mb-10">
      <div className="space-y-4">
        {data.map((task) => {
          const item = mapFromServer(task);
          return (
            <EditableListItem<PracticeTaskItem>
              key={item.id}
              itemData={item}
              isEditing={editingId === item.id}
              onEdit={() => setEditingId(item.id)}
              onCancelEdit={() => setEditingId(null)}
              onSave={(id, updated) => handleSave(String(id), updated)}
              onDelete={(id) => handleDelete(id)}
              onToggleVisibility={(id) => handleToggleVisibility(id)}
              isPubliclyVisible={item.is_public}
              renderDisplay={(d) => (
                <div>
                  <div className="font-semibold">{d.title}</div>
                  <div className="text-sm text-text-secondary">
                    {new Date(d.start_datetime).toLocaleString()} | {d.duration_minutes} דקות | {d.category}
                  </div>
                  <p className="mt-1">{d.description}</p>
                </div>
              )}
              renderEditForm={(d, onChange) => (
                <div className="space-y-2">
                  <Input value={d.title} onChange={(e) => onChange("title", e.target.value)} placeholder="כותרת" />
                  <textarea
                    className="border rounded p-2 w-full"
                    value={d.description}
                    onChange={(e) => onChange("description", e.target.value)}
                    placeholder="תיאור"
                  />
<Input
  type="datetime-local"
  value={toDatetimeLocal(d.start_datetime)}
  onChange={(e) => onChange("start_datetime", e.target.value)}
/>


                  <Input
                    type="number"
                    value={d.duration_minutes}
                    onChange={(e) => onChange("duration_minutes", Number(e.target.value))}
                    placeholder="משך (בדקות)"
                  />
                  <select
                    className="border rounded p-2 w-full"
                    value={d.category}
                    onChange={(e) => onChange("category", e.target.value)}
                  >
                    <option value="">בחר קטגוריה</option>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded p-2 w-full"
                    value={d.status}
                    onChange={(e) => onChange("status", e.target.value)}
                  >
                    <option value="">בחר סטטוס</option>
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    value={d.reminder_minutes_before ?? ""}
                    onChange={(e) => onChange("reminder_minutes_before", Number(e.target.value))}
                    placeholder="תזכורת (בדקות לפני)"
                  />
                </div>
              )}
            />
          );
        })}

        {editingId !== "new" && (
          <button className="text-sm text-primary hover:underline" onClick={() => setEditingId("new")}>
            + הוספת משימה חדשה
          </button>
        )}

        {editingId === "new" && (
          <EditableListItem<PracticeTaskItem>
            itemData={{
              id: "new",
              title: "",
              description: "",
              start_datetime: "",
              duration_minutes: 30,
              category: "",
              reminder_minutes_before: null,
              is_public: true,
              status: "pending",
            }}
            isEditing={true}
            onEdit={() => {}}
            onCancelEdit={() => setEditingId(null)}
            onSave={(id, updated) => handleSave(String(id), updated)}
            onDelete={() => setEditingId(null)}
            onToggleVisibility={() => {}}
            isPubliclyVisible={true}
            renderDisplay={() => null}
            renderEditForm={(d, onChange) => (
              <div className="space-y-2">
                <Input value={d.title} onChange={(e) => onChange("title", e.target.value)} placeholder="כותרת" />
                <textarea
                  className="border rounded p-2 w-full"
                  value={d.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="תיאור"
                />
             <Input
  type="datetime-local"
  value={toDatetimeLocal(d.start_datetime)}
  onChange={(e) => onChange("start_datetime", e.target.value)}
/>

                <Input
                  type="number"
                  value={d.duration_minutes}
                  onChange={(e) => onChange("duration_minutes", Number(e.target.value))}
                  placeholder="משך (בדקות)"
                />
                <select
                  className="border rounded p-2 w-full"
                  value={d.category}
                  onChange={(e) => onChange("category", e.target.value)}
                >
                  <option value="">בחר קטגוריה</option>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <select
                  className="border rounded p-2 w-full"
                  value={d.status}
                  onChange={(e) => onChange("status", e.target.value)}
                >
                  <option value="">בחר סטטוס</option>
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  value={d.reminder_minutes_before ?? ""}
                  onChange={(e) => onChange("reminder_minutes_before", Number(e.target.value))}
                  placeholder="תזכורת (בדקות לפני)"
                />
              </div>
            )}
          />
        )}
      </div>
    </GridContainer>
  );
};
