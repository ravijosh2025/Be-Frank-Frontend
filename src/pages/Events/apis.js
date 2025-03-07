import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authHelpers";

export const eventApi = createApi({
    reducerPath: "eventApi",
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
    tagTypes: ["Events"],
    endpoints: (builder)=> ({
        getEvents: builder.query({
            query: ()=> "/api/events",
            providesTags: ["Events"],
        }),
        getEventById: builder.query({
            query: (id) => `/events/${id}`
        }),
        createEvent: builder.mutation({
            query: (eventData) =>({
                url: "/api/events",
                method: "POST", 
                body: eventData
            }),
            invalidatesTags: ["Events"]
        }),
        updateEvent: builder.mutation({
            query: (eventData) =>({
                url: `/api/events/${eventData.id}`,
                method: "PUT", 
                body: eventData
            }),
            invalidatesTags: ["Events"]
        }),
        deleteEvent: builder.mutation({
            query: (id) => {
                const token = getToken();
                return {
                    url: `/api/events/${id}`,
                    method: "DELETE",
                }
            },
            invalidatesTags: ["Events"]
        }),
    })
})

export const { useGetEventsQuery,useGetEventByIdQuery, useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation } = eventApi;