import { Lightbulb } from "lucide-react";
import { useGetAIInsightsQuery } from "../store/aiInsightApi";
import { CardWrapper } from "./CardWrapper";

export const SummaryStrengths = () => {
  const { data, error, isLoading } = useGetAIInsightsQuery();

  if (isLoading) return <p>טוען נקודות חוזקה...</p>;
  if (error) return <p>אירעה שגיאה בעת שליפת הנתונים</p>;
  if (!data || data.length === 0) return <p>לא נמצאו נקודות חוזקה.</p>;

  return (
    <CardWrapper
      title="נקודות חוזקה מה-AI"
      icon={<Lightbulb size={24} />}
      className="border-l-4 border-[--color-primary] bg-[--color-background]"
    >
      <div
        className="overflow-y-auto pr-2 scrollbar-none"
        style={{ maxHeight: "13rem" }}
      >
        <ul className="space-y-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 text-[--color-text] bg-white p-2 rounded-lg"
            >
              <span>{item.strengths}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};
