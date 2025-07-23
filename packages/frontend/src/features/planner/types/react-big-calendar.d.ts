declare module 'react-big-calendar';
declare module "react-big-calendar/lib/addons/dragAndDrop" {
  import { CalendarProps } from "react-big-calendar";
  import * as React from "react";

  export interface withDragAndDropProps<TEvent = object> extends CalendarProps<TEvent> {}

  export default function withDragAndDrop<TEvent = object>(
    component: React.ComponentType<CalendarProps<TEvent>>
  ): React.ComponentType<CalendarProps<TEvent>>;
}
