import { useEffect } from "react";
import States  from "../features/activity-Moonitoring/hooks/States";
import StatsDateRangePicker from "../features/activity-Moonitoring/components/StatsDateRangePicker";

export default function StatsDashboard() {
  return (
    <div>
      <StatsDateRangePicker />
    </div>
  );
}

