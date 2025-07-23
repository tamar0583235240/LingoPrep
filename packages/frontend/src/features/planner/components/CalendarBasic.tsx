import * as React from "react";
import { Calendar, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

type EventType = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type CalendarBasicProps = {
  events: EventType[];
  onEventMove: (args: { event: EventType; start: Date; end: Date }) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
  onSelectEvent?: (event: EventType) => void;
};

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

export const CalendarBasic: React.FC<CalendarBasicProps> = ({
  events,
  onEventMove,
  onSelectSlot,
  onSelectEvent,
}) => {
  return (
    <div style={{ height: 600 }}>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        draggableAccessor={() => true}
        onEventDrop={onEventMove}
        onEventResize={onEventMove}
        resizable
        popup
        selectable={!!onSelectSlot}  // מאפשר בחירת תאים רק אם פונקציה הועברה
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        style={{ height: 600 }}
      />
    </div>
  );
};
