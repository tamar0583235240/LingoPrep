import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const localizer = momentLocalizer(moment);

const categoryColors: Record<string, string> = {
  simulation: "bg-blue-500",
  reading: "bg-green-500",
  sharing: "bg-purple-500",
};

type Task = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: string;
};

type EventWrapperProps = {
  event: Task;
};

export const PracticeTasksCalendar = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [form, setForm] = useState({ title: "", category: "simulation", duration: 30 });

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedSlot(start);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert("אנא הזיני כותרת תקינה");
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: form.title,
      category: form.category,
      start: selectedSlot!,
      end: new Date(selectedSlot!.getTime() + form.duration * 60000),
    };
    setTasks([...tasks, newTask]);
    setModalOpen(false);
    setForm({ title: "", category: "simulation", duration: 30 });
  };

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={tasks}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        views={["month", "week", "day"]}
        components={{
          event: ({ event }: EventWrapperProps) => (
            <motion.div
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`rounded px-2 py-1 text-white text-sm ${categoryColors[event.category]}`}
            >
              {event.title}
            </motion.div>
          ),
        }}
      />

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4"
          >
            <Dialog.Title className="text-xl font-semibold">הוספת משימה</Dialog.Title>

            <div className="space-y-2">
              <label className="block text-sm font-medium">כותרת</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <label className="block text-sm font-medium">קטגוריה</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="simulation">סימולציה</option>
                <option value="reading">קריאה</option>
                <option value="sharing">שיתוף</option>
              </select>

              <label className="block text-sm font-medium">משך בדקות</label>
              <Input
                type="number"
                min={1}
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                ביטול
              </Button>
              <Button onClick={handleSave}>שמור</Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
