// PracticeTasksCalendar.tsx
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import {
  useGetPracticeTasksQuery,
  useCreatePracticeTaskMutation,
  useUpdatePracticeTaskMutation,
  useDeletePracticeTaskMutation,
} from "../services/practiceTasksApi";
import { CalendarBasic } from "./CalendarBasic";
import { CalendarWithHeader } from "../../../shared/ui/CalendarWithHeader.tsx";
import { TaskEditModal } from "./TaskEditModal";
type PracticeTaskItem = {
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

//  const formatToDatetimeLocal = (date: Date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   return `${year}-${month}-${day}T${hours}:${minutes}`;
// };

export const formatToDatetimeLocal = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


const mapFromServer = (task: any): PracticeTaskItem => {
  const mapped = {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    startDatetime: formatToDatetimeLocal(new Date(task.start_datetime)),

    durationMinutes: task.duration_minutes ?? 30,
    category: task.category ?? "",
     status: task.status ?? "pending", 
    reminderMinutesBefore: task.reminder_minutes_before ?? null,
    isPublic: task.status === "public",
  };
  console.log("mapFromServer:", mapped);
  return mapped;
};

export const PracticeTasksCalendar = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  console.log("User ID:", userId);

  const { data: tasks = [], refetch } = useGetPracticeTasksQuery(
    { user_id: userId! },
    { skip: !userId }
  );
  console.log("Fetched tasks:", tasks);

  const [createTask] = useCreatePracticeTaskMutation();
  const [updateTask] = useUpdatePracticeTaskMutation();
  const [deleteTask] = useDeletePracticeTaskMutation();

  const [selectedTask, setSelectedTask] = React.useState<PracticeTaskItem | null>(null);
  const [isNew, setIsNew] = React.useState(false);


  const [currentDate, setCurrentDate] = React.useState(new Date());

const onPrevMonth = () => {
  const prev = new Date(currentDate);
  prev.setMonth(prev.getMonth() - 1);
  setCurrentDate(prev);
};
const onNextMonth = () => {
  const next = new Date(currentDate);
  next.setMonth(next.getMonth() + 1);
  setCurrentDate(next);
};

const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString("he-IL", { year: "numeric", month: "long" });
};



  const events = tasks
    .map(mapFromServer)
    .map((task) => ({
      id: task.id,
      title: task.title,
      start: new Date(task.startDatetime),
      end: new Date(new Date(task.startDatetime).getTime() + task.durationMinutes * 60000),
    }));
  console.log("Mapped events for calendar:", events);

const mapToServer = (item: PracticeTaskItem) => {
  const localStart = fixDateToLocal(item.startDatetime);

  const mapped = {
    user_id: userId!,
    title: item.title,
    description: item.description,
    start_datetime: localStart.toISOString(), 
    duration_minutes: item.durationMinutes,
    category: item.category,
    reminder_minutes_before: item.reminderMinutesBefore,
    status: item.status,
  };
  console.log("mapToServer:", mapped);
  return mapped;
};



  const handleEventMove = async ({ event, start, end }: { event: { id: string }; start: Date; end: Date }) => {
    console.log("handleEventMove called with:", event, start, end);
    try {
      const originalTask = tasks.find((t) => t.id === event.id);
      if (!originalTask) {
        console.warn("Original task not found for event:", event.id);
        return;
      }

      await updateTask({
        id: event.id,
        data: {
          user_id: originalTask.userId,
          title: originalTask.title,
          description: originalTask.description,
          start_datetime: start.toISOString(),
          duration_minutes: Math.round((end.getTime() - start.getTime()) / 60000),
          category: originalTask.category,
          reminder_minutes_before: originalTask.reminderMinutesBefore,
          status: originalTask.status,
        },
      }).unwrap();

      console.log("Event updated successfully:", event.id);
      refetch();
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };
  


 const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
  console.log("start as received:", start);
  console.log("ISO string:", start.toISOString());
  console.log("Locale string:", start.toLocaleString());
  console.log("Datetime-local format:", formatToDatetimeLocal(start));
  
 const now = new Date();
  start.setHours(now.getHours(), now.getMinutes()); // מוסיפה שעה נוכחית
  const formatted = formatToDatetimeLocal(start);

  setSelectedTask({
    id: "new",
    title: "",
    description: "",
    startDatetime: formatted,
    durationMinutes: Math.round((end.getTime() - start.getTime()) / 60000),
    category: "",
    status: "pending",
    reminderMinutesBefore: null,
    isPublic: true,
  });
  setIsNew(true);
};



  const handleSelectEvent = (event: { id: string }) => {
    console.log("handleSelectEvent called with event id:", event.id);
    const task = tasks.find((t) => t.id === event.id);
    if (!task) {
      console.warn("Task not found for event:", event.id);
      return;
    }
    setSelectedTask(mapFromServer(task));
    setIsNew(false);
  };

const fixDateToLocal = (date: Date | string) => {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate;
};


  const handleSave = async (task: PracticeTaskItem) => {
    console.log("handleSave called with task:", task, "isNew:", isNew);
            const fixedTask = {
  ...task,
  startDatetime: fixDateToLocal(task.startDatetime),
};
    try {
      if (isNew) {
        await createTask(mapToServer(task)).unwrap();
        console.log("Task created successfully");
      } else {

        await updateTask({ id: task.id, data: mapToServer(task) }).unwrap();
        console.log("Task updated successfully");
      }
      setSelectedTask(null);
      setIsNew(false);
      refetch();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleCancel = () => {
    console.log("handleCancel called");
    setSelectedTask(null);
    setIsNew(false);
  };

  const handleChange = (field: keyof PracticeTaskItem, value: any) => {
    console.log(`handleChange called for field "${field}" with value:`, value);
    if (!selectedTask) return;
    setSelectedTask({ ...selectedTask, [field]: value });
  };

  if (!userId) {
    console.log("User is not logged in");
    return <div>נא להתחבר כדי לראות את לוח השנה</div>;
  }

  return (
    <div>
   <CalendarWithHeader
  events={events}
    tasks={tasks} 
  onEventMove={handleEventMove}
  onSelectSlot={handleSelectSlot}
  onSelectEvent={handleSelectEvent}
/>
      {/* <CalendarBasic
        events={events}
        onEventMove={handleEventMove}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      /> */}

      {/* טופס עריכה */}
    {selectedTask && (
  <TaskEditModal
    task={selectedTask}
    isNew={isNew}
    onSave={handleSave}
    onDelete={async (id) => {
      try {
        await deleteTask(id).unwrap();
        setSelectedTask(null);
        refetch();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }}
    onClose={handleCancel}
  />
)}


    </div>
  );
};
