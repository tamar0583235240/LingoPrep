
import React, { useEffect, useState } from "react";
import ReminderSettingsCard from "../features/reminders/components/ReminderSettingsCard";
import { useGetUserReminderSettingsQuery, useSaveUserReminderSettingsMutation } from "../shared/api/api";
import { ReminderType, ReminderSelection } from "../features/reminders/types/reminderType";
import { Button } from "../shared/ui/button";
import { GridContainer } from "../shared/ui/GridContainer";
import { useSelector } from 'react-redux';
import { RootState } from "../shared/store/store";
import { useNavigate } from "react-router-dom";

export default function RemindersPage() {
    const navigate = useNavigate();

    const userId = useSelector((state: RootState) => {
        return state.auth.user?.id;
    });
    const { data: savedData, isLoading } = useGetUserReminderSettingsQuery(userId!, {
        skip: !userId,
    });
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
            if (userId) {
                await saveSettings({ userId, settings: selections }).unwrap();
            } else {
                console.error("No user ID found – cannot save settings.");
            }

            if (allDisabled) {
                showMessage("לא נבחרו תזכורות, תוכלי להוסיף מתי שתרצי בהמשך", "warning");
            } else {
                showMessage("ההגדרות נשמרו בהצלחה!", "success");
            }
        } catch (e) {
            showMessage("אירעה שגיאה בשמירה", "warning");
        }
        window.dispatchEvent(new Event('refreshSettingsPage'));
    };

    if (isLoading) return <div>טוען...</div>;

    return (
        <div className="min-h-screen">
            <GridContainer maxWidth="md">
                {message && (
                    <div
                        className={`mb-4 p-3 rounded text-sm text-center font-medium ${messageType === "success"
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
                    description="קבלי טיפ מעשי!"
                    reminderType="tip"
                    savedOption={selections.tip}
                    onOptionChange={handleOptionChange}
                />

                <ReminderSettingsCard
                    title="שאלות לתרגול"
                    description="קבלי תזכורות  לתרגול שאלות מקצועיות כדי לשפר את הידע שלך!"
                    reminderType="practice"
                    savedOption={selections.practice}
                    onOptionChange={handleOptionChange}
                    className="mt-6" 
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

