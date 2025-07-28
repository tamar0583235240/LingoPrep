import { useState } from "react";
import { Heading1 } from "../../../shared/ui/typography";
import { ChoosingLevel } from "./ChoosingLevel";
import { ChoosingTopic } from "./ChoosingTopic";
import { QuestionsList } from "./QuestionsList";
import { ChoosingType } from "./ChoosingType";

export const MainPracticeUser = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* כותרת */}
      <div className="text-center">
        <Heading1 className="text-[--color-text] mb-2">
          שאלות לתרגול בתכנות
        </Heading1>
      </div>
      <br />

      {/* סינון לפי נושא ורמת קושי */}
      <div className="flex flex-wrap justify-end gap-4 rtl:flex-row-reverse">
        <ChoosingLevel value={selectedLevel} onChange={setSelectedLevel} />
        <ChoosingType value={selectedType} onChange={setSelectedType} />
        <ChoosingTopic value={selectedTopic} onChange={setSelectedTopic} />
      </div>

      {/* רשימת שאלות */}
      <QuestionsList topicName={selectedTopic} level={selectedLevel} type={selectedType}/>
    </div>
  );
};
