import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { categoriesType } from "../types/categoriesType";



export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
<<<<<<< HEAD
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
=======
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
>>>>>>> 511ac081870e1132ef1c22bd80103b735959f568
    endpoints: (builder) =>  ({
        getAllCategories: builder.query<categoriesType[], void>({
            query: () => 'categories'
        })
    }),
})

export const { useGetAllCategoriesQuery } = categoriesApi;