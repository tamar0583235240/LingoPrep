import { useEffect } from "react";
import States  from "../features/activity-Monitoring/hooks/States";
import StatsDateRangePicker from "../features/activity-Monitoring//components/StatsDateRangePicker";

export default function StatsDashboard() {
  return (
    <div>
      <StatsDateRangePicker />
    </div>
  );
}

// export default function StatsDashboard() {
//   const { data, loading, error, fetchStats } = States();

//   useEffect(() => {
//     const today = new Date();
//     const monthAgo = new Date();
//     monthAgo.setMonth(today.getMonth() - 1);

//     const to = today.toISOString().slice(0, 10);
//     const from = monthAgo.toISOString().slice(0, 10);

//     fetchStats(from, to);
//   }, []);

//   if (loading) return <div>טוען נתונים…</div>;
//   if (error) return <div>שגיאה: {error}</div>;

//   return (
//     <div>
//       <h1>נתונים</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
