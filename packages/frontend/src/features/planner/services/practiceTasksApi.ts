import { api } from "../../../shared/api/api";
import { PracticeTasks, PracticeTaskInput } from "../types/PracticeTasks";

export const practiceTasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // 1. שליפת כל המשימות של משתמש לפי user_id 
    getPracticeTasks: builder.query<PracticeTasks[], { user_id: string; from?: string; to?: string }>({
      query: ({ user_id, from, to }) => {
        const searchParams = new URLSearchParams({ user_id });
        if (from) searchParams.append("from", from);
        if (to) searchParams.append("to", to);
        return `/practice-tasks?${searchParams.toString()}`;
      },
      providesTags: ["PracticeTasks"],
    }),

    // 2. שליפת משימה אחת לפי מזהה
    getPracticeTaskById: builder.query<PracticeTasks, string>({
      query: (id) => `/practice-tasks/${id}`,
      providesTags: (_result, _err, id) => [{ type: "PracticeTasks", id }],
    }),

    // 3. יצירת משימה
    createPracticeTask: builder.mutation<PracticeTasks, PracticeTaskInput>({
      query: (taskData) => ({
        url: "/practice-tasks",
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: ["PracticeTasks"],
    }),

    // 4. עדכון משימה
    updatePracticeTask: builder.mutation<PracticeTasks, { id: string; data: PracticeTaskInput }>({
      query: ({ id, data }) => ({
        url: `/practice-tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "PracticeTasks", id },
        { type: "PracticeTasks" },
      ],
    }),

    // 5. מחיקת משימה
    deletePracticeTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `/practice-tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, id) => [
        { type: "PracticeTasks", id },
        { type: "PracticeTasks" },
      ],
    }),
  }),
});

export const {
  useGetPracticeTasksQuery,
  useGetPracticeTaskByIdQuery,
  useCreatePracticeTaskMutation,
  useUpdatePracticeTaskMutation,
  useDeletePracticeTaskMutation,
} = practiceTasksApi;
