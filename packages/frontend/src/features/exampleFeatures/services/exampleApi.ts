

export {}
// import { api } from "../../../shared/api/api";
// import { exampleType } from "../types/exampleType";

// export const exampleApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     getItems: builder.query<exampleType[], void>({
//       query: () => "items",
//       providesTags: ["Item"],
//     }),
//     addItem: builder.mutation<exampleType, Partial<exampleType>>({
//       query: (item) => ({
//         url: "items",
//         method: "POST",
//         body: item,
//       }),
//       invalidatesTags: ["Item"],
//     }),
//     deleteItem: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `items/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Item"],
//     }),
//   }),
// });

// export const {
//   useGetItemsQuery,
//   useAddItemMutation,
//   useDeleteItemMutation,
// } = exampleApi;
