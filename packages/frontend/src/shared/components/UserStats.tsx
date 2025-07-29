// import { useEffect, useState } from "react";

// type Stats = {
//   activeUsers: number;
//   avgTimeMinutes: number;
// };

// export const UserStats = () => {
//   const [weekly, setWeekly] = useState<Stats | null>(null);
//   const [daily, setDaily] = useState<Stats | null>(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("לא נמצא טוקן - המשתמש כנראה לא מחובר");
//         return;
//       }

//       try {
//         // שבועי
//         const weeklyRes = await fetch("http://localhost:5000/stats/weekly-stats", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (weeklyRes.ok) {
//           const weeklyData = await weeklyRes.json();
//           setWeekly(weeklyData);
//         } else {
//           console.error("שגיאה בסטטיסטיקות שבועיות");
//         }

//         // יומי
//         const dailyRes = await fetch("http://localhost:5000/stats/daily-stats", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (dailyRes.ok) {
//           const dailyData = await dailyRes.json();
//           setDaily(dailyData);
//         } else {
//           console.error("שגיאה בסטטיסטיקות יומיות");
//         }
//       } catch (error) {
//         console.error("שגיאה בבקשת סטטיסטיקות:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const formatTime = (minutes: number) => {
//     if (!minutes || isNaN(minutes) || minutes <= 0) return "0:00";
//     const mins = Math.floor(minutes);
//     const secs = Math.round((minutes - mins) * 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   if (!weekly || !daily) return <p>טוען נתונים...</p>;

//   return (
//     <div className="flex flex-col md:flex-row gap-6 mt-6 justify-center">
//       <div className="bg-white rounded-lg shadow-md p-6 min-w-[220px] text-center">
//         <h3 className="text-xl font-bold mb-2">היום</h3>
//         <p>🧍‍♀️ משתמשות פעילות: {daily.activeUsers}</p>
//         <p>⏳ זמן שהייה ממוצע: {formatTime(daily.avgTimeMinutes)} דקות</p>
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-6 min-w-[220px] text-center">
//         <h3 className="text-xl font-bold mb-2">השבוע</h3>
//         <p>🧍‍♀️ משתמשות פעילות: {weekly.activeUsers}</p>
//         <p>⏳ זמן שהייה ממוצע: {formatTime(weekly.avgTimeMinutes)} דקות</p>
//       </div>
//     </div>
//   );
// };

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
