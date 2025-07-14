
// pages/RemindersPage.tsx

import React, { useEffect, useState } from "react";
import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
import { useGetUserReminderSettingsQuery, useSaveUserReminderSettingsMutation } from "../shared/api/api";
import { ReminderType, ReminderSelection } from "../features/reminders/types/reminderType";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";

export default function RemindersPage() {
  const userId = "63b3ab3c-e4d7-485d-ba3e-36748208835e"; // להחליף ל־auth דינמי
  const { data: savedData, isLoading } = useGetUserReminderSettingsQuery(userId);
  const [saveSettings, { isLoading: isSaving }] = useSaveUserReminderSettingsMutation();

  const [selections, setSelections] = useState<Record<ReminderType, ReminderSelection>>({
    tip: { is_enabled: false, frequency: null },
    practice: { is_enabled: false, frequency: null },
  });

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "warning" | "info" | null>(null);

  useEffect(() => {
    if (savedData) {
      setSelections(savedData);
    }
  }, [savedData]);

  const showMessage = (msg: string, type: "success" | "warning" | "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const handleOptionChange = (reminderType: ReminderType, data: ReminderSelection) => {
    setSelections((prev) => ({ ...prev, [reminderType]: data }));
  };

  const isEqual = (a: ReminderSelection, b: ReminderSelection) =>
    a.is_enabled === b.is_enabled && a.frequency === b.frequency;

  const handleSave = async () => {
    if (!savedData) return;

    const hasChanges = Object.keys(selections).some((key) =>
      !isEqual(selections[key as ReminderType], savedData[key as ReminderType])
    );

    if (!hasChanges) {
      showMessage("לא בוצעו שינויים לשמירה", "info");
      return;
    }

    const allDisabled =
      !selections.tip.is_enabled && !selections.practice.is_enabled;

    try {
      await saveSettings({ userId, settings: selections }).unwrap();

      if (allDisabled) {
        showMessage("לא נבחרו תזכורות, תוכלי להוסיף מתי שתרצי בהמשך", "warning");
      } else {
        showMessage("ההגדרות נשמרו בהצלחה!", "success");
      }
    } catch (e) {
      showMessage("אירעה שגיאה בשמירה", "warning");
    }
  };

  if (isLoading) return <div>טוען...</div>;

  return (
    <div className="min-h-screen">
      <GridContainer maxWidth="md">
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-800"
                : messageType === "warning"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {message}
          </div>
        )}

        <ReminderSettingsCard
          title="טיפים"
          description="קבלי טיפים מעשיים באופן קבוע"
          reminderType="tip"
          savedOption={selections.tip}
          onOptionChange={handleOptionChange}
        />

        <ReminderSettingsCard
          title="שאלות לתרגול"
          description="תרגלי שאלות מקצועיות על פי תדירות שתבחרי"
          reminderType="practice"
          savedOption={selections.practice}
          onOptionChange={handleOptionChange}
          className="mt-6" // ⬅️ מרווח בין הכרטיסיות
        />

        <div className="mt-8 text-center">
          <Button size="lg" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "שומר..." : "שמור את ההגדרות"}
          </Button>
        </div>
      </GridContainer>
    </div>
  );
}
