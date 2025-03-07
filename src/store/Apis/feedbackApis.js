import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authHelpers";

// Define API service
export const feedbackApi = createApi({
    reducerPath: "feedbackApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL ,
      prepareHeaders: (headers) => {
          const token = getToken();
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
      },
    }),
    endpoints: (builder) => ({
      addFeedback: builder.mutation({
        query: (data) => ({
          url: "/api/feedback",
          method: "POST",
          body: data,
        }),
      }),
      updateFeedback: builder.mutation({
        query: (data) => ({
          url: `/api/feedback/${data.id}`,
          method: "PUT",
          body:{'feedback':data.feedback},
        }),
      }),
      deleteFeedback: builder.mutation({
        query: (id) => ({
          url: `/api/feedback/${id}`,
          method: "DELETE",
        }),
      }),
     }),
});
  
export const { useAddFeedbackMutation, useUpdateFeedbackMutation, useDeleteFeedbackMutation } = feedbackApi;

  
