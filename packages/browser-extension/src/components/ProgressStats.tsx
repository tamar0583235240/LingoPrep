import type { ProgressStatsProps } from "../api/types";
import { BarChart2 } from "lucide-react";
import { CardWrapper } from "../ui/CardWrapper";

export const ProgressStats = ({ pd }: ProgressStatsProps) => {
  if (!pd) return <div className="p-4 text-center">Loading...</div>;
  console.log("ProgressStats pd:", pd);

  const total = pd?.totalQuestions ?? 0;
  const answered = pd?.answeredQuestions ?? 0;
  const percentage = pd?.progressPercent ?? 0;
  return (
    <CardWrapper
      title="התקדמות כללית"
      icon={<BarChart2 size={24} />}
    >
      <div className="h-52 flex flex-col items-center justify-center space-y-7">

      <div className="font-semibold text-sm text-[--color-text]">
        {answered} / {total} שאלות הושלמו
      </div>

      <div className="w-full h-4 bg-[--color-border] rounded-full overflow-hidden">
        <div
          className="h-full bg-[--color-primary] transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="text-sm text-[--color-secondary-text]">
        הושלמו {percentage.toFixed(1)}% מתוך כלל השאלות
      </div>
       </div>
 </CardWrapper>
  );
};