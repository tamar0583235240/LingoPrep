// // import { useEffect, useState } from "react";

// // export const WeeklyStats = () => {
// //   const [stats, setStats] = useState<{ activeUsers: number, avgTimeMinutes: number } | null>(null);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       const token = localStorage.getItem("token");
// //       const res = await fetch("http://localhost:5000/stats/weekly-stats", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await res.json();
// //       setStats(data);
// //     };
// //     fetchStats();
// //   }, []);

// //   if (!stats) return <p>טוען נתונים...</p>;

// //   const formatTime = (minutes: number) => {
// //     if (!minutes || isNaN(minutes) || minutes <= 0) return "0:00";
// //     const mins = Math.floor(minutes);
// //     const secs = Math.round((minutes - mins) * 60);
// //     return `${mins}:${secs.toString().padStart(2, "0")}`;
// //   };

// //   return (
// //     <div className="text-center mt-6">
// //       <p className="text-lg font-bold">👩‍💻 משתמשות פעילות בשבוע: {stats.activeUsers}</p>
// //       <p className="text-md mt-2">⏳ זמן שהייה ממוצע: {formatTime(stats.avgTimeMinutes)} דקות</p>
// //     </div>
// //   );
// // };
// import { useEffect, useState } from "react";

// export const WeeklyStats = () => {
//   const [stats, setStats] = useState<{ activeUsers: number, avgTimeMinutes: number } | null>(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("לא נמצא טוקן - המשתמש כנראה לא מחובר");
//         console.log("טוקן שנשלח:", token);
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:5000/stats/weekly-stats", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//         });

//         if (res.status === 403) {
//           console.error("אין הרשאה לגשת לנתיב /stats/weekly-stats");
//           return;
//         }

//         const data = await res.json();
//         setStats(data);
//       } catch (error) {
//         console.error("שגיאה בבקשת סטטיסטיקות:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (!stats) return <p>טוען נתונים...</p>;

//   const formatTime = (minutes: number) => {
//     if (!minutes || isNaN(minutes) || minutes <= 0) return "0:00";
//     const mins = Math.floor(minutes);
//     const secs = Math.round((minutes - mins) * 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="text-center mt-6">
//       <p className="text-lg font-bold">👩‍💻 משתמשות פעילות בשבוע: {stats.activeUsers}</p>
//       <p className="text-md mt-2">⏳ זמן שהייה ממוצע: {formatTime(stats.avgTimeMinutes)} דקות</p>
//     </div>
//   );
// };



//החלפתי שם לקובץ!!!!
export {};