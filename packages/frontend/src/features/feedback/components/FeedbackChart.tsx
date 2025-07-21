import { useGetFeedbackAveragesQuery } from "../services/feedbackApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function FeedbackChart() {
  const { data, isLoading, error } = useGetFeedbackAveragesQuery();

  if (isLoading) return <p>טוען...</p>;

  if (error) {
    let errorMessage = "שגיאה בטעינת הנתונים.";

    if ("status" in error) {
      const fetchError = error as FetchBaseQueryError;
      if (
        typeof fetchError.data === "object" &&
        fetchError.data !== null &&
        "message" in fetchError.data
      ) {
        errorMessage = `שגיאה מהשרת: ${
          (fetchError.data as { message: string }).message
        }`;
      } else {
        errorMessage = `שגיאה מהשרת: סטטוס ${fetchError.status}`;
      }
    } else {
      errorMessage = `שגיאה כללית: ${error.message || "לא ידועה"}`;
    }
    return <p>{errorMessage}</p>;
  }

  console.log("FeedbackChart data:", data);

  if (
    !data ||
    data.relevance === undefined ||
    data.tips === undefined ||
    data.ai === undefined ||
    data.usability === undefined
  ) {
    return <p>אין נתונים זמינים או הנתונים חלקיים עבור הגרף.</p>;
  }
  console.log(typeof data.relevance);

  const chartData = [
    { name: "רלוונטיות", value: parseFloat(data.relevance) },
    { name: "טיפים", value: parseFloat(data.tips) },
    { name: "AI", value: parseFloat(data.ai) },
    { name: "שימושיות", value: parseFloat(data.usability) },
  ];

  return (
    <div
      style={{ width: "100%", maxWidth: 600, height: 340 }} // העליתי קצת את הגובה
      className="p-6 pb-12 bg-white rounded-2xl shadow-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-8">
        {" "}
        {/* הגדלתי ל-mb-8 */}
        ממוצעי משובים
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontWeight: "500" }} // אפור כהה רך
            axisLine={{ stroke: "#d1d5db" }} // אפור בהיר לקו ציר
            tickLine={false}
          />
          <YAxis
            domain={[0, 5]}
            tickCount={6}
            tick={{ fill: "#6b7280", fontWeight: "500" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
            }}
            itemStyle={{ color: "#374151" }}
            cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
          />
          <Bar
            dataKey="value"
            fill="#6366f1" // סגול בהיר יותר
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
