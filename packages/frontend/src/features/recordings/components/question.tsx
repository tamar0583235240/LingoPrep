import React from 'react';
import { useGetQuestionByIdQuery } from "../services/answerApi";

interface TitleQuestionsProps {
    data: string; 
}

export const TitleQuestions: React.FC<TitleQuestionsProps> = ({ data }) => {
    const questions = useGetQuestionByIdQuery(data);
    return (
        <div>
            {questions.data?.content}
        </div>
    );
};