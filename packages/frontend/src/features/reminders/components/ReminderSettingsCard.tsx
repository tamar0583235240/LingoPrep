import React, { useEffect, useState } from "react";
import { ReminderFrequency, ReminderType, ReminderSelection } from "../types/reminderType";
import { CardSimple } from "../../../shared/ui/card";
import { cn } from "../../../shared/utils/cn";

const options = [
  { id: "daily", text: "כל יום", icon: "📅" },
  { id: "every_2_days", text: "כל יומיים", icon: "📅" },
  { id: "every_3_days", text: "אחת ל־3 ימים", icon: "📅" },
  { id: "weekly", text: "אחת לשבוע", icon: "📅" },
] as const;

type Props = {
  title: string;
  description: string;
  reminderType: ReminderType;
  savedOption?: ReminderSelection;
  onOptionChange: (reminderType: ReminderType, data: ReminderSelection) => void;
  className?: string; // ⬅️ חדש
};

export default function ReminderSettingsCard({
  title,
  description,
  reminderType,
  savedOption,
  onOptionChange,
  className,
}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ReminderFrequency | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // משתנה להודעת שגיאה

  useEffect(() => {
    setIsEnabled(savedOption?.is_enabled ?? false);
    setSelectedOption(savedOption?.frequency ?? null);
  }, [savedOption]);

  const toggleSwitch = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);

    // אם המתג נדלק אבל לא נבחרה תדירות, מציגים הודעה
    if (newEnabled && !selectedOption) {
    } else {
      setErrorMessage(null); // אם המתג נדלק ונבחרה תדירות, מנקים את הודעת השגיאה
      const newSelection: ReminderSelection = {
        is_enabled: newEnabled,
        frequency: newEnabled ? selectedOption : null,
      };
      onOptionChange(reminderType, newSelection);
    }
  };

  const selectOption = (frequency: ReminderFrequency) => {
    setSelectedOption(frequency);
    setErrorMessage(null); // אם בחרנו תדירות, מנקים את הודעת השגיאה
    if (isEnabled) {
      onOptionChange(reminderType, {
        is_enabled: true,
        frequency,
      });
    }
  };

  return (
    <CardSimple className={cn("space-y-4 w-full", className)}>
      <div className="flex items-center gap-2 justify-between">
        <button
          onClick={toggleSwitch}
          className={cn(
            "relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 p-0.5",
            isEnabled ? "bg-primary-dark" : "bg-gray-300"
          )}
        >
          <span
            className={cn(
              "inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform",
              isEnabled ? "translate-x-0" : "-translate-x-5"
            )}
          />
        </button>
        <div className="text-right">
          <h3 className="text-lg font-semibold text-text-main mb-1">{title}</h3>
          <p className="text-sm text-text-secondary leading-snug">{description}</p>
        </div>
      </div>

      {isEnabled ? (
        <>
          <h4 className="text-sm font-medium text-text-main text-center mt-4 text-right">
            בחרי תדירות:
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => selectOption(option.id)}
                className={cn(
                  "relative p-4 rounded-lg border cursor-pointer transition-all text-center space-y-1",
                  selectedOption === option.id
                    ? "bg-primary-dark border-primary-dark text-white"
                    : "bg-gray-50 border-border text-text-main hover:border-gray-300"
                )}
              >
                <div className="text-2xl">{option.icon}</div>
                <p className="text-sm font-medium">{option.text}</p>
                {selectedOption === option.id && (
                  <div className="absolute top-2 right-2">
                    <span className="text-white font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-text-secondary mt-4 text-sm text-right">
          הדליקי את המתג כדי לבחור תדירות תזכורת
        </p>
      )}

      {errorMessage && (
        <div className="text-red-500 text-center mt-2">
          <p>{errorMessage}</p>
        </div>
      )}
    </CardSimple>
  );
}
