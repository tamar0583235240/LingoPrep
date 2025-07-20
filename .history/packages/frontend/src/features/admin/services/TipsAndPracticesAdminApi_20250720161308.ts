import { api } from "../../../shared/api/api";
import { Tip } from "../types/Tips";
import { Practice } from "../types/Practices";

export const AdminTipsAndPracticesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // טיפים
    addTip: builder.mutation<void, Tip>({
      query: (tip) => ({
        url: "/api/tips-manager/addTip",  // הוספתי את /api
        method: "POST",
        body: tip,
      }),
      invalidatesTags: [{ type: 'Item', id: 'TIP' }],
    }),
    getAllTips: builder.query<Tip[], void>({
      query: () => "/api/tips-manager",  // הוספתי את /api
      providesTags: [{ type: 'Item', id: 'TIP' }],
    }),
    updateTip: builder.mutation<Tip, Partial<Tip>>({
      query: (data) => ({
        url: "/api/tips-manager/updateTip",  // הוספתי את /api
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: 'Item', id: 'TIP' }],
    }),
    deleteTipById: builder.mutation<string, string>({
      query: (id) => ({
        url: `/api/tips-manager/deleteTipById/${id}`,  // הוספתי את /api
        method: "PATCH",
      }),
      invalidatesTags: [{ type: 'Item', id: 'TIP' }],
    }),

    // תרגולים
    addPractice: builder.mutation<void, Practice>({
      query: (practice) => ({
        url: "/api/practices-manager/addPractice",  // הוספתי את /api
        method: "POST",
        body: practice,
      }),
      invalidatesTags: [{ type: 'Item', id: 'PRACTICE' }],
    }),
    getAllPractices: builder.query<Practice[], void>({
      query: () => "/api/practices-manager",  // הוספתי את /api
      providesTags: [{ type: 'Item', id: 'PRACTICE' }],
    }),
    updatePractice: builder.mutation<Practice, Partial<Practice>>({
      query: (data) => ({
        url: "/api/practices-manager/updatePractice",  // הוספתי את /api
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: 'Item', id: 'PRACTICE' }],
    }),
    deletePracticeById: builder.mutation<string, string>({
      query: (id) => ({
        url: `/api/practices-manager/deletePracticeById/${id}`,  // הוספתי את /api
        method: "PATCH",
      }),
      invalidatesTags: [{ type: 'Item', id: 'PRACTICE' }],
    }),
  }),
});

export const {
  useGetAllTipsQuery,
  useAddTipMutation,
  useUpdateTipMutation,
  useDeleteTipByIdMutation,
  useGetAllPracticesQuery,
  useAddPracticeMutation,
  useUpdatePracticeMutation,
  useDeletePracticeByIdMutation,
} = AdminTipsAndPracticesApi;