import * as React from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { he } from "date-fns/locale";
import { format, addMonths, subMonths } from "date-fns";
import { Button } from "./button";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(BigCalendar);

export type MyCalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

interface CalendarWithHeaderProps {
  events: MyCalendarEvent[];
    tasks: { id: string; status?: string }[]; 
  onEventMove?: (args: any) => void;
  onSelectSlot?: (args: any) => void;
  onSelectEvent?: (event: MyCalendarEvent) => void;
}

export const CalendarWithHeader: React.FC<CalendarWithHeaderProps> = ({
  events,
    tasks,
  onEventMove,
  onSelectSlot,
  onSelectEvent,
}) => {
  const [currentMonthDate, setCurrentMonthDate] = React.useState(new Date());
  const [currentView, setCurrentView] = React.useState(Views.MONTH);

  const handlePrevMonth = () => setCurrentMonthDate(subMonths(currentMonthDate, 1));
  const handleNextMonth = () => setCurrentMonthDate(addMonths(currentMonthDate, 1));

  const handleViewChange = (view: string) => {
    setCurrentView(view as any);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 space-y-4">
      {/* כותרת חודש עם חצים */}
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <span>{format(currentMonthDate, "MMMM yyyy", { locale: he })}</span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handlePrevMonth}
            size="sm"
            variant="outline"
            title="חודש קודם"
            icon={<ChevronLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            קודם
          </Button>
          <Button
            onClick={handleNextMonth}
            size="sm"
            variant="outline"
            title="חודש הבא"
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            הבא
          </Button>
        </div>
      </div>

      {/* לוח שנה עצמו */}
      <div className="calendar-wrapper rounded overflow-hidden border">
       <DnDCalendar
  localizer={localizer}
  events={events}
  startAccessor="start"
  endAccessor="end"
  style={{ height: 600 }}
  date={currentMonthDate}
  onNavigate={(newDate: Date) => setCurrentMonthDate(newDate)}
  view={currentView}
  onView={handleViewChange}
  defaultView={Views.MONTH}
  views={["month", "week", "day"]}
  selectable
  popup
  onEventDrop={onEventMove}
  onSelectSlot={onSelectSlot}
  onSelectEvent={onSelectEvent}
eventPropGetter={(event: { id: string }) => {
  const isCompleted = tasks.find(t => t.id === event.id)?.status === "completed";
  return {
    className: isCompleted ? "line-through text-gray-500 bg-gray-100" : "",
  };
}}
  messages={{
    next: "הבא",
    previous: "הקודם",
    today: "היום",
    month: "חודש",
    week: "שבוע",
    day: "יום",
    agenda: "רשימה",
    showMore: (total: number) => `+ עוד ${total}`,
  }}
/>

      </div>
    </div>
  );
};
