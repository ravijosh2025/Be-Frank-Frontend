import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi=createApi({
    reducerPath: "userApi",
    baseQuery:fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    endpoints: (builder)=>({
        register: builder.mutation({
            query:(data)=>({
                url: "/api/users",
                method: "POST",
                body:data
            })
        })
    })   
})

export const { useRegisterMutation } = userApi;