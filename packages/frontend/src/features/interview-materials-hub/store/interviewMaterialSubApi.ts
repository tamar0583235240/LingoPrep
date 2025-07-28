// src/features/interview-materials-hub/api/interviewMaterialSubApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { interview_materials_subType } from '../types/interview_materials_subType';

export const interviewMaterialSubApi = createApi({
  reducerPath: 'interviewMaterialSubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['InterviewMaterialSub'],
  endpoints: (builder) => ({
    // 1. Get all materials
    getAllMaterials: builder.query<interview_materials_subType[], void>({
      query: () => 'interviewMaterialSub',
      providesTags: ['InterviewMaterialSub'],
    }),

    // 2. Search materials by term
    searchMaterials: builder.query<interview_materials_subType[], string>({
      query: (searchTerm) =>
        `interviewMaterialSub/search?q=${encodeURIComponent(searchTerm)}`,
    }),
    updateDownloadsCount: builder.mutation<void, { id: string }>({
  query: ({ id }) => ({
    url: `/interviewMaterialSub/${id}`,
    method: "PATCH",
  }),
}),
  }),
});

export const {
  useGetAllMaterialsQuery,
  useSearchMaterialsQuery,
  useUpdateDownloadsCountMutation
} = interviewMaterialSubApi;
