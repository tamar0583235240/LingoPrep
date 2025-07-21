import React, { useEffect, useState } from "react";
import { fetchActivityData } from "../../../shared/api/activity_MonitoringhApi";

interface Activity {
  user_id: string;
  full_name: string;
  action: string;
  timestamp: string;
}

const ActivityPage = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivityData()
      .then((res) => setData(res))
      .catch((err) => {
        console.error(err);
        setError("שגיאה בטעינת נתוני פעילות");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>טוען נתוני פעילות...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 text-right">
      <h2 className="text-xl font-bold mb-4 text-center">יומן פעילות משתמשים</h2>
      <table className="w-full border border-gray-300 text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">משתמש</th>
            <th className="border p-2">פעולה</th>
            <th className="border p-2">זמן</th>
          </tr>
        </thead>
        <tbody>
          {data.map((activity, i) => (
            <tr key={i}>
              <td className="border p-2">{activity.full_name}</td>
              <td className="border p-2">{activity.action}</td>
              <td className="border p-2">{new Date(activity.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityPage;
