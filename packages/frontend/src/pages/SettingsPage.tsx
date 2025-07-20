const SettingsPage = () => {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">⚙️ הגדרות</h1>

      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-lg font-semibold">🔧 העדפות מערכת</h2>
        <p><strong>שפה:</strong> עברית</p>
        <p><strong>מצב כהה:</strong> לא פעיל</p>
        <p><strong>גיבוי אוטומטי:</strong> מופעל</p>
        <p><strong>אזור זמן:</strong> Asia/Jerusalem</p>
        <p><strong>שעת מערכת:</strong> 14:00</p>
      </div>

      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-white">
        <h2 className="text-lg font-semibold">🔔 התראות</h2>
        <p><strong>התראות דוא"ל:</strong> מופעלות</p>
        <p><strong>התראות SMS:</strong> כבויות</p>
        <p><strong>תזכורות יומיות:</strong> מופעלות</p>
      </div>

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
