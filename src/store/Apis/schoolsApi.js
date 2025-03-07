import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authHelpers";

export const schoolApi = createApi({
    reducerPath: "schoolApi",
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
    tagTypes: ["Schools"],
    endpoints: (builder)=> ({
        getSchools: builder.query({
            query: ()=> "/api/schools",
            providesTags: ["Schools"],
        }),
        createSchool: builder.mutation({
            query: (data) => {
                return {
                    url: `/api/schools`,
                    method: "POST",
                    body:data,
                }
            },
            invalidatesTags: ["Schools"]
        }),
        updateSchool: builder.mutation({
            query: (data) => {
                return {
                    url: `/api/schools/${data.id}`,
                    method: "PUT",
                    body:data,
                }
            },
            invalidatesTags: ["Schools"]
        }),
        deleteSchool: builder.mutation({
            query: (id) => {
                const token = localStorage.getItem("token");
                return {
                    url: `/api/schools/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Schools"]
        }),
    })
})

export const { useGetSchoolsQuery, useCreateSchoolMutation, useUpdateSchoolMutation, useDeleteSchoolMutation } = schoolApi;