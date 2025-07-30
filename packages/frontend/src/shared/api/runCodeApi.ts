import { api } from '../api/api';

export const practiceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // עדכון סטטוס שאלה
        updateQuestionStatus: builder.mutation({
            query: ({ userId, questionId, status }: { userId: string; questionId: string; status: string }) => ({
                url: `/codeQuestions/question/status`,
                method: 'POST',
                body: { userId, questionId, status },
            }),
        }),

        // שמירת תשובת משתמש
        saveUserAnswer: builder.mutation({
            query: ({ userId, questionId, answer, codeLanguage }: { userId: string; questionId: string; answer: string; codeLanguage?: string }) => ({
                url: `/codeQuestions/question/answer`,
                method: 'POST',
                body: { userId, questionId, answer, codeLanguage },
            }),
        }),

        // שליפת סטטוס של כל השאלות למשתמש
        getQuestionStatuses: builder.query({
            query: (userId: string) => `/codeQuestions/getQuestionStatus/${userId}`,
        }),

        // שליפת התשובה של המשתמש לשאלה ספציפית
        getUserAnswer: builder.query({
            query: ({ userId, questionId }) =>
                `/codeQuestions/userAnswer/${userId}/${questionId}`,
        }),

        // מחיקת תשובת משתמש לשאלה
        deleteUserAnswer: builder.mutation<void, { userId: string; questionId: string }>({
            query: ({ userId, questionId }) => ({
                url: `/codeQuestions/deleteUserAnswer/${userId}/${questionId}`,
                method: 'DELETE',
                body: { userId, questionId },
            }),
        }),

        // הרצת קוד
        runCode: builder.mutation({
            query: ({ language, code }) => ({
                url: `/codeQuestions/runCode`,
                method: 'POST',
                body: { language, code },
            }),
        }),

        // לייק או דיסלייק לשאלה
        voteQuestion: builder.mutation({
            query: ({ userId, questionId, liked }: { userId: string; questionId: string; liked: boolean }) => ({
                url: `/codeQuestions/likes`,
                method: 'POST',
                body: { userId, questionId, liked },
            }),
        }),

        // שליפת מצב הלייקים לשאלה
        getQuestionVotes: builder.query({
            query: (questionId: string) => `/codeQuestions/likes/${questionId}`,
        }),

        // שליחת מייל
        sendEmail: builder.mutation<{ success: boolean; message: string }, { to: string; subject: string; text: string }>({
            query: ({ to, subject, text }) => ({
                url: `/codeQuestions/sendEmail`,
                method: 'POST',
                body: { to, subject, text },
            }),
        }),

    }),
});

export const {
    useUpdateQuestionStatusMutation,
    useSaveUserAnswerMutation,
    useGetQuestionStatusesQuery,
    useGetUserAnswerQuery,
    useLazyGetUserAnswerQuery,
    useDeleteUserAnswerMutation,
    useRunCodeMutation,
    useVoteQuestionMutation,
    useGetQuestionVotesQuery,
    useSendEmailMutation,
} = practiceApi;

