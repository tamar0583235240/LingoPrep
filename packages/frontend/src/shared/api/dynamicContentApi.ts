import { api } from './api';

export interface DynamicContent {
  id: number;
  key_name: string;
  description: string;
  content: string;
}

export const dynamicContentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDynamicContents: builder.query<DynamicContent[], void>({
      query: () => '/api/dynamic-contents',
      providesTags: ['DynamicContents'],
    }),

    updateDynamicContent: builder.mutation<DynamicContent, { id: number; content: string }>({
      query: ({ id, content }) => ({
        url: `/api/dynamic-contents/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['DynamicContents'],
    }),

    // createDynamicContent: builder.mutation<DynamicContent, { key_name: string; description: string; content: string }>({
    //   query: (newContent) => ({
    //     url: `/api/dynamic-contents/`,
    //     method: 'POST',
    //     body: newContent,
    //   }),
    //   invalidatesTags: ['DynamicContents'],
    // }),

    // deleteDynamicContent: builder.mutation<{ success: boolean; id: number }, number>({
    //   query: (id) => ({
    //     url: `/api/dynamic-contents/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['DynamicContents'],
    // }),
  }),
});

export const {
  useGetDynamicContentsQuery,
  useUpdateDynamicContentMutation,
} = dynamicContentApi;
