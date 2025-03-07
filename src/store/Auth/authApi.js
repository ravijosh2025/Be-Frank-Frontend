import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authHelpers";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl : import.meta.env.VITE_BASE_URL}),
    endpoints: (builder) => ({
      login: builder.mutation({
        query: (credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials,
        }),
      }),
      logout: builder.mutation({ 
        query: () => {
          const token = getToken();
          return {
          url: "/logout",
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {}, 
          }
        },
      }),
    }),
  });

export const { useLoginMutation, useLogoutMutation } = authApi;
