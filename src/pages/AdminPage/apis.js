import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authHelpers";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: (builder)=> ({
        getUsers: builder.query({
            query: ()=> "/api/users",
            providesTags: ["Users"],
        }),
        getUserById: builder.query({
            query: (id) => `/events/${id}`
        }),
        createUser: builder.mutation({
            query: (userData) =>({
                url: "/api/users",
                method: "POST", 
                body: userData
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: (userData) =>({
                url: `/api/users/${userData.id}`,
                method: "PUT", 
                body: userData
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                const token = getToken();
                return {
                    url: `/api/users/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Users"]
        }),
    })
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = adminApi;