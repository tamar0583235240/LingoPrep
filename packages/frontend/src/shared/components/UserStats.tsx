
import { useEffect, useState } from "react";

interface StatsResponse {
  weeklyActiveUsers: number;
  weeklyAvgTimeMinutes: number;
  dailyActiveUsers: number;
  dailyAvgTimeMinutes: number;
}

export const UserStats = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("לא נמצא טוקן - המשתמש כנראה לא מחובר");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/stats/weekly-stats", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        if (!res.ok) {
          console.error("שגיאה ב-fetch לנתיב /stats/weekly-stats");
          return;
        }

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("שגיאה בבקשת סטטיסטיקות:", error);
      }
    };

    fetchStats();
  }, []);

  const formatTime = (minutes: number) => {
    if (!minutes || isNaN(minutes) || minutes <= 0) return "0:00";
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!stats) return <p>טוען נתונים...</p>;

  return (
    <div className="text-center mt-6">
      <h2 className="text-xl font-bold mb-4">📊 נתוני שימוש</h2>

      <p className="text-lg font-semibold">🗓️ פעילות שבועית:</p>
      <p className="text-md">👩‍💻 משתמשות פעילות: {stats.weeklyActiveUsers}</p>
      <p className="text-md mb-4">⏳ זמן שהייה ממוצע: {formatTime(stats.weeklyAvgTimeMinutes)} דקות</p>

      <p className="text-lg font-semibold mt-4">📅 פעילות יומית:</p>
      <p className="text-md">👩‍💻 משתמשות פעילות: {stats.dailyActiveUsers}</p>
      <p className="text-md">⏳ זמן שהייה ממוצע: {formatTime(stats.dailyAvgTimeMinutes)} דקות</p>
    </div>
  );
};
