import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoriesType } from "../types/categoriesType";



export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    endpoints: (builder) =>  ({
        getAllCategories: builder.query<categoriesType[], void>({
            query: () => 'categories'
        })
    }),
})

export const { useGetAllCategoriesQuery } = categoriesApi;