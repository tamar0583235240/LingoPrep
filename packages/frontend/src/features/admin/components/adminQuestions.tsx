import { useEffect, useState } from "react";
import { useGetAllQuestionsQuery, useGetCategoryForQuestionQuery } from "../services/adminQuestionApi";
import { DeleteQuestion } from "./deleteQuestion";
import { Button } from "../../../shared/ui/button";
import { GridContainer } from "../../../shared/ui/GridContainer";
import { Heading1 } from "../../../shared/ui/typography";
import { CardSimple } from "../../../shared/ui/card";
import { UpdateQuestion } from "./updateQuestion";
import { Question } from "../types/Question";
import { AddQuestion } from "./addQuestion";
import { SearchComponents } from "./searchComponents";
import { useDynamicContents } from "../../dynamicContent/hooks/useDynamicContents";
import { Category } from "../types/Categories";

type AdminQuestionsProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export const AdminQuestions: React.FC<AdminQuestionsProps> = ({ allowedRoles, children }) => {
  const { data, isLoading } = useGetAllQuestionsQuery();
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!data) return;

    const results = searchText.trim()
      ? data.filter(q => q.title.toLowerCase().includes(searchText.toLowerCase()))
      : data;

    setFilteredQuestions(results);
  }, [searchText, data]);

  const getCategory = (questionId: string) => {
    const { data, error } = useGetCategoryForQuestionQuery(questionId);
    if (data) {
      const c: Category = {
        id: data.id,
        name: data.name,
      };
      return c;
    }
    if (error) {
      console.error("Error fetching category for question:", error);
      return null;
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen bg-[--color-background]" dir="rtl">
        <GridContainer className="py-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-[--color-border] border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-[--color-secondary-text] text-lg">טוען נתונים...</p>
          </div>
        </GridContainer>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-[--color-background]" dir="rtl">
        <GridContainer className="py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-danger/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[--color-text] mb-2">שגיאה בטעינת הנתונים</h2>
            <p className="text-[--color-secondary-text]">אירעה שגיאה בטעינת השאלות. אנא נסה שוב מאוחר יותר.</p>
          </div>
        </GridContainer>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="min-h-screen bg-[--color-background]" dir="rtl">
        <GridContainer className="py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[--color-secondary-text]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[--color-text] mb-2">אין שאלות במערכת</h2>
            <p className="text-[--color-secondary-text]">לא נמצאו שאלות. הוסף שאלות חדשות כדי להתחיל.</p>
          </div>
        </GridContainer>
      </div>
    );

  const activeQuestions = filteredQuestions
    .filter(question => question.is_active === true)
    .sort((a, b) => {
      const numA = parseInt(a.id.split('-').pop() || '0', 10);
      const numB = parseInt(b.id.split('-').pop() || '0', 10);
      return numA - numB;
    });

  const deleteClick = (idQuestion: string) => {
    setQuestionToDelete(idQuestion);
  };

  const editClick = (question: Question) => {
    setQuestionToEdit(question);

  };

  return (
    <div className="min-h-screen bg-[--color-background]" dir="rtl">
      <div className="bg-white border-b border-[--color-border]">
        <GridContainer className="py-8" style={{ marginBottom: "0px" }}>
          <div className="text-center">
            <AdminQuestionsTitle />
          </div>
          <SearchComponents searchText={searchText} setSearchText={setSearchText} />
          <AddQuestion />
        </GridContainer>
      </div>

      <GridContainer className="py-8">
        {activeQuestions.length === 0 ? (
          searchText.trim() ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[--color-secondary-text]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[--color-text] mb-2">לא נמצאו שאלות</h3>
              <p className="text-[--color-secondary-text]">לא נמצאו שאלות התואמות לחיפוש "{searchText}".</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[--color-text] mb-2">אין שאלות פעילות</h3>
              <p className="text-[--color-secondary-text]">כל השאלות במערכת כרגע מוגדרות כלא פעילות.</p>
            </div>
          )
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {activeQuestions.map((question, index) => (
              <CardSimple
                key={question.id}
                className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-[#00D6AD] bg-[#00D6AD]/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#00D6AD]/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-[#00D6AD]">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[--color-text]">
                      {question.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setQuestionToEdit(question)}
                    size="sm"
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    iconPosition="right"
                  />

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteClick(question.id)}
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                    iconPosition="right"
                  />
                </div>
              </CardSimple>
            ))}
          </div>
        )}
        {questionToEdit && (
          <UpdateQuestion
            question={questionToEdit}
            questionSaveClick={() => setQuestionToEdit(null)}
          />
        )}
        {questionToDelete && (
          <DeleteQuestion
            id={questionToDelete}
            onClose={() => setQuestionToDelete(null)}
          />
        )}
      </GridContainer>
    </div>
  );
};

// 👇 קומפוננטת כותרת מופרדת, עם return מסודר
export const AdminQuestionsTitle: React.FC = () => {
  const { contents, loading, error } = useDynamicContents();

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">טוען כותרת...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const titleItem = contents.find(item => item.key_name === "admin_questions_title");

  return (
    <Heading1 className="text-[--color-text] mb-2">
      {titleItem ? titleItem.content : "ניהול שאלות"}
    </Heading1>
  );
};
