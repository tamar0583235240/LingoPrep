import { useEffect, useState } from "react";

interface Topic {
  id: string;
  name: string;
}

interface ChoosingTopicProps {
  value: string;
  onChange: (value: string) => void;
}

export const ChoosingTopic = ({ value, onChange }: ChoosingTopicProps) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/codeQuestions/topics");
        const data = await res.json();
        setTopics(data);
      } catch (error) {
        console.error("שגיאה בקבלת נושאים:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div dir="rtl" className="flex flex-col items-start gap-2 w-fit">
      <label className="font-semibold text-[--color-text]">בחרי נושא:</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-right truncate
                   focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent transition"
        >
          <option value="">ללא</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

};
