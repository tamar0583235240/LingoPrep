import React, { useEffect, useState } from "react";
import { ReminderType, ReminderFrequency, ReminderSelection } from "../types/reminderType";
import { CardSimple } from "../../../shared/ui/card"; // נניח שיש לך קומפוננטת CardSimple
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
};

export default function ReminderSettingsCard({
  title,
  description,
  reminderType,
  savedOption,
  onOptionChange,
}: Props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ReminderFrequency | null>(null);

  useEffect(() => {
    setIsEnabled(savedOption?.is_enabled ?? false);
    setSelectedOption(savedOption?.frequency ?? null);
  }, [savedOption]);

  const toggleSwitch = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    const newSelection: ReminderSelection = {
      is_enabled: newEnabled,
      frequency: newEnabled ? selectedOption : null,
    };
    onOptionChange(reminderType, newSelection);
  };

  const selectOption = (frequency: ReminderFrequency) => {
    setSelectedOption(frequency);
    if (isEnabled) {
      onOptionChange(reminderType, {
        is_enabled: true,
        frequency,
      });
    }
  };

  return (
    <CardSimple className="space-y-4">
      <div className="flex items-center gap-2 justify-between">
        <button
          onClick={toggleSwitch}
          className={cn(
            "relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none",
            isEnabled ? "bg-primary-dark" : "bg-gray-300"
          )}
        >
          <span
            className={cn(
              "inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform",
              isEnabled ? "translate-x-5" : "translate-x-0"
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
          <h4 className="text-sm font-medium text-text-main text-center mt-4">בחרי תדירות:</h4>
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => selectOption(option.id)}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer text-center",
                  selectedOption === option.id
                    ? "bg-primary-dark border-primary-dark text-white"
                    : "bg-gray-50 border-border text-text-main"
                )}
              >
                <div className="text-2xl">{option.icon}</div>
                <p className="text-sm font-medium">{option.text}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-text-secondary mt-4 text-sm">הפעילי כדי לבחור תדירות</p>
      )}
    </CardSimple>
  );
}


// בודקת את העיצוב החדש
//יעבוד על זה אחכ
//!!!!אם עובד לי אם לא טוב משאירה בהערה
// import React, { useEffect, useState } from "react";
// import { CardSimple } from "../../../shared/ui/card";
// import { cn } from "../../../shared/utils/cn";
// import { ReminderFrequency, ReminderSelection, ReminderType } from "../types/reminderType";

// const options = [
//   { id: "daily", text: "כל יום", icon: "📅" },
//   { id: "every_2_days", text: "כל יומיים", icon: "📅" },
//   { id: "every_3_days", text: "אחת ל־3 ימים", icon: "📅" },
//   { id: "weekly", text: "אחת לשבוע", icon: "📅" },
// ] as const;

// interface Props {
//   title: string;
//   description: string;
//   reminderType: ReminderType;
//   savedOption?: ReminderSelection;
//   onOptionChange: (reminderType: ReminderType, data: ReminderSelection) => void;
// }

// export default function ReminderSettingsCard({
//   title,
//   description,
//   reminderType,
//   savedOption,
//   onOptionChange,
// }: Props) {
//   const [isEnabled, setIsEnabled] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<ReminderFrequency | null>(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   useEffect(() => {
//     setIsEnabled(savedOption?.is_enabled ?? false);
//     setSelectedOption(savedOption?.frequency ?? null);
//   }, [savedOption]);

//   const toggleSwitch = () => {
//     const newEnabled = !isEnabled;
//     setIsEnabled(newEnabled);
//     const newSelection: ReminderSelection = {
//       is_enabled: newEnabled,
//       frequency: newEnabled ? selectedOption : null,
//     };
//     onOptionChange(reminderType, newSelection);
//   };

//   const selectOption = (frequency: ReminderFrequency) => {
//     setSelectedOption(frequency);
//     if (isEnabled) {
//       onOptionChange(reminderType, {
//         is_enabled: true,
//         frequency,
//       });
//       setShowConfirmation(true);
//       setTimeout(() => setShowConfirmation(false), 3000);
//     }
//   };

//   return (
//     <CardSimple className="space-y-4">
//       <div className="flex items-center gap-2 justify-between">
//         <button
//           onClick={toggleSwitch}
//           className={cn(
//             "relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 p-0.5",
//             isEnabled ? "bg-primary-dark" : "bg-gray-300"
//           )}
//           aria-pressed={isEnabled}
//           aria-label={`הפעלת תזכורת עבור ${title}`}
//         >
//           <span
//             className={cn(
//               "inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform",
//               isEnabled ? "translate-x-5" : "translate-x-0"
//             )}
//           />
//         </button>
//         <div>
//           <h3 className="text-lg font-semibold text-text-main mb-1 text-right">{title}</h3>
//           <p className="text-sm text-text-secondary leading-snug text-right">{description}</p>
//         </div>
//       </div>

//       {isEnabled ? (
//         <>
//           <h4 className="text-sm font-medium text-text-main text-center mt-4 text-right">
//             בחרי את תדירות התזכורת שלך:
//           </h4>

//           <div className="grid grid-cols-2 gap-4">
//             {options.map((option) => (
//               <div
//                 key={option.id}
//                 onClick={() => selectOption(option.id)}
//                 className={cn(
//                   "relative p-4 rounded-lg border cursor-pointer transition-all text-center space-y-1",
//                   selectedOption === option.id
//                     ? "bg-primary-dark border-primary-dark text-white"
//                     : "bg-gray-50 border-border text-text-main hover:border-gray-300"
//                 )}
//               >
//                 <div className="text-2xl">{option.icon}</div>
//                 <p className="text-sm font-medium">{option.text}</p>
//                 {selectedOption === option.id && (
//                   <div className="absolute top-2 right-2">
//                     <span className="text-white">✓</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {showConfirmation && selectedOption && (
//             <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-green-600 font-bold">✓</span>
//                 <p className="text-green-800 text-sm text-right">
//                   נבחר: {options.find((opt) => opt.id === selectedOption)?.text}
//                 </p>
//               </div>
//             </div>
//           )}
//         </>
//       ) : (
//         <p className="text-center text-text-secondary mt-4 text-sm text-right">
//           הדליקי את המתג כדי לבחור תדירות תזכורת
//         </p>
//       )}
//     </CardSimple>
//   );
// }
