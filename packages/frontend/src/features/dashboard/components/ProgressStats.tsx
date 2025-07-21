import React, { useEffect } from "react";
import { BarChart2 } from "lucide-react";
import { useUserStore } from "../store/progressSlice";
import { useGetProgressStatsQuery } from "../../../shared/api/question";

const ProgressStats: React.FC = () => {
  const userId = useUserStore((state) => state.userId);
  const setAnswered = useUserStore((state) => state.setAnswered);
  const setTotal = useUserStore((state) => state.setTotal);

  const { data, isLoading, isError } = useGetProgressStatsQuery(userId ?? "", {
    skip: !userId,
  });

  useEffect(() => {
    if (data) {
      setAnswered(data.answeredQuestions);
      setTotal(data.totalQuestions);
    }
  }, [data, setAnswered, setTotal]);
console.log("user😋😋😋Id", userId);

  if (!userId) return <p>אנא התחבר</p>;
  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה בטעינת נתונים</p>;

  const total = data?.totalQuestions ?? 0;
  const answered = data?.answeredQuestions ?? 0;
  const percentage = total ? (answered / total) * 100 : 0;

  return (
    <section className="relative mx-auto max-w-md text-center p-6 bg-gradient-to-tr from-[--color-primary]/10 via-white to-[--color-primary]/20 rounded-3xl shadow-md">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-[--color-text]">
          <BarChart2 size={24} />
          <h2 className="text-xl font-bold">התקדמות כללית</h2>
        </div>

        <div className="font-semibold text-[--color-text]">
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
    </section>
  );
};

export default ProgressStats;
