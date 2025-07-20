
import { api } from "../../../shared/api/api";
import { Answer } from "../types/Answer";

export const recordingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Answer[], void>({
      query: () => "items",
      providesTags: ["Item"],
    }),
    addItem: builder.mutation<Answer, Partial<Answer>>({
      query: (item) => ({
        url: "items",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = recordingApi;
