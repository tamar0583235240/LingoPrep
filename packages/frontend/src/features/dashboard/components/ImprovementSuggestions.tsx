import { Wrench } from "lucide-react";
import { useGetAIInsightsQuery } from "../store/aiInsightApi";
import { CardWrapper } from "./CardWrapper";

export const ImprovementSuggestions = () => {
  const { data, error, isLoading } = useGetAIInsightsQuery();

  if (isLoading) return <p>טוען הצעות לשיפור...</p>;
  if (error) return <p>אירעה שגיאה בשליפה</p>;
  if (!data || data.length === 0) return <p>לא נמצאו הצעות לשיפור.</p>;

  return (
    <CardWrapper
      title="הצעות לשיפור מה-AI"
      icon={<Wrench size={24} />}
      className="border-l-4 border-[--color-primary] bg-[--color-background]"
    >
      <div
        className="overflow-y-auto pr-2 scrollbar-none"
        style={{ maxHeight: "13rem" }}
      >
        <ul className="space-y-4">
          {data.map((item) => (
            <li key={item.id} className="flex items-center gap-3 text-[--color-text] bg-white p-2 rounded-lg">
              <span>{item.improvements}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};
