import { useGetPageStatsQuery } from "../shared/api/activity_MonitoringhApi";

const Activity_Monitoring = () => {
  const { data, error, isLoading } = useGetPageStatsQuery();

  if (isLoading) return <p>טוען נתונים...</p>;
  if (error) return <p>אירעה שגיאה בעת טעינת הנתונים</p>;

  return (
    <div>
      <h2>ניטור פעילות משתמשים</h2>
      <table>
        <thead>
          <tr>
            <th>עמוד</th>
            <th>כמות כניסות</th>
            <th>זמן שהיה ממוצע (שניות)</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row) => (
            <tr key={row.metric}>
              <td>{row.metric}</td>
              <td>{row.total_visits}</td>
              <td>{row.avg_time_sec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activity_Monitoring


