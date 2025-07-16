import { useEffect, useState } from "react";
// משתמשת ב־ useState כדי לשמור את הנתונים שיגיעו מהשרת.
export const WeeklyStats = () => {
  const [stats, setStats] = useState<{ activeUsers: number, avgTimeMinutes: number } | null>(null);
  //  שליפת הנתונים מהשרת
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("לא נמצא טוקן - המשתמש כנראה לא מחובר");
        console.log("טוקן שנשלח:", token);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/stats/weekly-stats", {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (res.status === 403) {
          console.error("אין הרשאה לגשת לנתיב /stats/weekly-stats");
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

  if (!stats) return <p>טוען נתונים...</p>;

  // הופך ערך כמו 12.5 ל־"12:30" דקות.
  const formatTime = (minutes: number) => {
    if (!minutes || isNaN(minutes) || minutes <= 0) return "0:00";
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center mt-6">
      <p className="text-lg font-bold">👩‍💻 משתמשות פעילות בשבוע: {stats.activeUsers}</p>
      <p className="text-md mt-2">⏳ זמן שהייה ממוצע: {formatTime(stats.avgTimeMinutes)} דקות</p>
    </div>
  );
};

