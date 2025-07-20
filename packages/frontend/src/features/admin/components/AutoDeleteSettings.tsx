import { useState, useEffect } from "react";
import { Button } from "../../../shared/ui/button";
import axios from "axios";
import { Listbox } from '@headlessui/react';
export const AutoDeleteSettings = () => {
  const [retention, setRetention] = useState<string>("7");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get("/api/auto-delete/auto-delete-config").then(res => {
      setRetention(res.data.retention_days?.toString() ?? "7");
    });
  }, []);

const handleSave = async () => {
  setIsSaving(true);
  try {
    await axios.post("/api/auto-delete/auto-delete-config", {
      is_enabled: true,
      retention_days: Number(retention),
     
    });
    alert(" המחיקה הוגדרה בהצלחה");
  } catch (err: any) {
    console.error("שגיאה בשמירה", err);
    alert(`אירעה שגיאה בשמירה: ${err.response?.data?.message || err.message}`);
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="border rounded-xl p-4 bg-white shadow mt-6 max-w-sm">
      <label htmlFor="retention-select" className="block mb-2 font-bold text-right">
        מחק הקלטות אוטומטית כל:
      </label>
      <select 
        id="retention-select"
        value={retention}
        onChange={(e) => setRetention(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="1">1 יום</option>
        <option value="7">7 ימים</option>
        <option value="30">30 ימים</option>
        <option value="90">90 ימים</option>
      </select>

      <Button className="mt-4 w-full" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "שומרת..." : "שמור"}
      </Button>
    </div>
  );
};
