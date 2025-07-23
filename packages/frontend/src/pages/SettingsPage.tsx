// import { Navigate, useNavigate } from "react-router-dom";


// const SettingsPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="max-w-xl mx-auto p-6 space-y-8">
//       <h1 className="text-2xl font-bold text-center">⚙️ הגדרות</h1>

//       <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
//         <h2 className="text-lg font-semibold">🔧 העדפות מערכת</h2>
//         <p><strong>שפה:</strong> עברית</p>
//         <p><strong>מצב כהה:</strong> לא פעיל</p>
//         <p><strong>גיבוי אוטומטי:</strong> מופעל</p>
//         <p><strong>אזור זמן:</strong> Asia/Jerusalem</p>
//         <p><strong>שעת מערכת:</strong> {new Date().toLocaleTimeString("he-IL")}</p>
//       </div>

//       <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
//         <h2 className="text-lg font-semibold">🔔 תזכורות</h2>
//         <p><strong>התראות לדוא"ל:</strong> מופעלות</p>
//         <p><strong> טיפים:</strong> מופעלות</p>
//         <p><strong> תדירות:</strong> יומי</p>
//         <p><strong> תזכורות:</strong> מופעלות</p>
//         <p><strong> תדירות:</strong> שבועי</p>
//         <button
//         className="text-blue-600 underline"
//         onClick={() => navigate("/tipsAndPractices")}
//       >
//         לשינוי ההגדרות
//       </button>
//       </div>

//       <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
//         <h2 className="text-lg font-semibold">🗂️ מידע כללי</h2>
//         <p><strong>גרסת מערכת:</strong> 1.4.2</p>
//         <p><strong>תאריך התקנה:</strong> 2025-06-01</p>
//         <p><strong>סטטוס:</strong> תקינה</p>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shared/store/store";
import { useNavigate } from "react-router-dom";
import { useGetReminderSettingsQuery } from "./store/reminderSettingsApi";
import { UserReminderSetting } from "../features/reminders/types/reminderType";


// תוויות תדירות בעברית
const frequencyLabels: Record<UserReminderSetting["frequency"], string> = {
  daily: "כל יום",
  every_2_days: "כל יומיים",
  every_3_days: "אחת ל־3 ימים",
  weekly: "אחת לשבוע",
};

// פונקציית תרגום תדירות
const getFrequencyLabel = (freq: UserReminderSetting["frequency"] | undefined): string => {
  return freq ? frequencyLabels[freq] : "";
};

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const { data, isLoading, isError } = useGetReminderSettingsQuery(userId!, {
    skip: !userId,
  });

  const tipSetting = data?.tip;
  const practiceSetting = data?.practice;
  const anyEnabled = tipSetting?.is_enabled || practiceSetting?.is_enabled;

  if (isLoading) return <p>טוען הגדרות...</p>;
  if (isError) return <p className="text-red-500">שגיאה בטעינת ההגדרות</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">⚙️ הגדרות</h1>

      {/* העדפות מערכת */}
      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-lg font-semibold">🔧 העדפות מערכת</h2>
        <p><strong>שפה:</strong> עברית</p>
        <p><strong>מצב כהה:</strong> לא פעיל</p>
        <p><strong>גיבוי אוטומטי:</strong> מופעל</p>
        <p><strong>אזור זמן:</strong> Asia/Jerusalem</p>
        <p><strong>שעת מערכת:</strong> {new Date().toLocaleTimeString("he-IL")}</p>
      </div>

      {/* תזכורות */}
      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-lg font-semibold">🔔 תזכורות</h2>

        <p><strong>התראות לדוא"ל:</strong> {anyEnabled ? "פועל" : "כבוי"}</p>

        <p><strong>טיפים:</strong> {tipSetting?.is_enabled ? "פועל" : "כבוי"}</p>
        {tipSetting?.is_enabled && (
          <p><strong>תדירות טיפים:</strong> {getFrequencyLabel(tipSetting.frequency)}</p>
        )}

        <p><strong>שאלות לתרגול:</strong> {practiceSetting?.is_enabled ? "פועל" : "כבוי"}</p>
        {practiceSetting?.is_enabled && (
          <p><strong>תדירות שאלות לתרגול:</strong> {getFrequencyLabel(practiceSetting.frequency)}</p>
        )}

        <button
          className="inline-flex items-center justify-center rounded-lg font-medium px-4 py-2 bg-[--color-primary] text-white hover:bg-[--color-primary-dark] focus:ring-2 focus:ring-[--color-primary] transition"
          onClick={() => navigate("/tipsAndPractices")}
        >
          לשינוי ההגדרות
        </button>
        </div>

        {/* מידע כללי */}
        <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
          <h2 className="text-lg font-semibold">🗂️ מידע כללי</h2>
          <p><strong>גרסת מערכת:</strong> 1.4.2</p>
          <p><strong>תאריך התקנה:</strong> 2025-06-01</p>
          <p><strong>סטטוס:</strong> תקינה</p>
        </div>
      </div>
      );
};

      export default SettingsPage;
