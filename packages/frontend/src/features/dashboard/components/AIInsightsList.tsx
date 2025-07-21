import { FileText } from "lucide-react";
import { useGetAiInsightsQuery } from '../services/aiInsightsApi';
import { CardWrapper } from "./CardWrapper";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const AIInsightsList: React.FC = () => {
  const { data: insights = [], isLoading, isError } = useGetAiInsightsQuery();

  if (isLoading) return <p>טוען מסקנות...</p>;
  if (isError) return <p>אירעה שגיאה בשליפה.</p>;
  if (insights.length === 0) return <p>לא נמצאו מסקנות.</p>;

  return (
    <CardWrapper
      title="מסקנות מה-AI"
      icon={<FileText size={24} />}
      className="border-l-4 border-[--color-primary] bg-[--color-background]"
    >
      <div
        className="overflow-y-auto pr-2 scrollbar-none"
        style={{ maxHeight: "13rem" }}
      >
        <ul className="list-inside space-y-3 text-[--color-text] text-base">
          {insights.map((insight: { id: Key | null | undefined; summary: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <li key={insight.id} className="flex items-center gap-3 text-[--color-text] bg-white p-2 rounded-lg">
              <span>{insight.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};

export default AIInsightsList;
