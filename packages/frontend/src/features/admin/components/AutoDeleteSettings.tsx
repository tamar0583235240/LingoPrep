import { useState, useEffect } from "react";
import { Button } from "../../../shared/ui/button";
import axios from "axios";
import { Listbox } from '@headlessui/react';
export const AutoDeleteSettings = () => {
  const [retention, setRetention] = useState<string>("7");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get("/api/auto-delete-config").then(res => {
      setRetention(res.data.retention_days?.toString() ?? "7");
    });
  }, []);

const handleSave = async () => {
  setIsSaving(true);
  try {
    await axios.post("/api/auto-delete-config", {
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
    <div className="border rounded-xl p-6 bg-white shadow mt-6 max-w-lg mx-auto">

      <label htmlFor="retention-select" className="block mb-2 font-bold text-right">
        מחק הקלטות אוטומטית כל:
      </label>
      <select 
        id="retention-select"
        value={retention}
        onChange={(e) => setRetention(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="1"> יום</option>
        <option value="7">שבוע</option>
        <option value="30">חודש</option>
        <option value="182">חצי שנה</option>
         <option value="365"> שנה</option>
      </select>

      <Button className="mt-4 w-full" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "שומר..." : "שמור"}
      </Button>
    </div>
  );
};
