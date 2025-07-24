import { useEffect, useState } from "react";
import useStats from "../hooks/States";
import { log } from "console";

const getRange = (option: string): [string, string] => {
  const today = new Date();
  const to = today.toISOString().slice(0, 10);
  let fromDate = new Date();

  switch (option) {
    case "today":
      fromDate = today;
      break;
    case "week":
      fromDate.setDate(today.getDate() - 7);
      break;
    case "month":
      fromDate.setMonth(today.getMonth() - 1);
      break;
    case "year":
      fromDate.setFullYear(today.getFullYear() - 1);
      break;
    default:
      fromDate = today;
  }

  const from = fromDate.toISOString().slice(0, 10);
  return [from, to];
};

const StatsDateRangePicker = () => {
  const { data, loading, error, fetchStats } = useStats();
  const [selected, setSelected] = useState("month");

  useEffect(() => {
    const [from, to] = getRange(selected);
    fetchStats(from, to);
  }, [selected]);

  return (
    <div>
      <h1>נתוני ניטור</h1>

      <label htmlFor="dateRange">בחר טווח זמן: </label>
      <select
        id="dateRange"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ marginBottom: "16px", padding: "4px 8px" }}
      >
        <option value="today">📆 היום</option>
        <option value="week">📆 השבוע</option>
        <option value="month">📆 החודש</option>
        <option value="year">📆 השנה</option>
      </select>

      {loading && <div>🔄 טוען נתונים…</div>}
      {error && <div>❌ שגיאה: {error}</div>}

      {!loading && !error && data && data.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>עמוד</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>כמות כניסות</th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>זמן שהיה ממוצע (שניות)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row,) => (
              <tr key={row.metric}>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{row.metric}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{row.total_visits ?? "-"}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{row.avg_time_sec ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <div>לא נמצאו נתונים לטווח התאריכים שנבחר</div>
      )}
    </div>
  );
};

export default StatsDateRangePicker;
