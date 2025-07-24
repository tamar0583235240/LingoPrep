import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoriesType } from "../types/categoriesType";



export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    endpoints: (builder) =>  ({
        getAllCategories: builder.query<categoriesType[], void>({
            query: () => 'categories'
        })
    }),
})

export const { useGetAllCategoriesQuery } = categoriesApi;