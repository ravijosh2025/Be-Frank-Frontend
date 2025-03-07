import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/authHelpers";

export const donationsApi = createApi({
    reducerPath: "donationsApi",
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_BASE_URL,
        prepareHeaders : (headers) =>{
            const token = getToken();
            if(token){
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ["Donations"],
    endpoints: (builder) =>({
        getDonations: builder.query({
            query: ()=> "/api/donations",
            providesTags: ["Donations"]
        }),
        createDonation: builder.mutation({
            query: (donationData) =>({
                url: "/api/donations",
                method: "POST",
                body: donationData
            }),
            invalidatesTags: ["Donations"]
        })
    })
})

export const {useGetDonationsQuery, useCreateDonationMutation} = donationsApi;