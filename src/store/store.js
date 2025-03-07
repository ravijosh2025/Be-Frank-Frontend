import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Auth/authApi";
import { userApi } from "./UserApis/userApi";
import { eventApi } from "../pages/Events/apis";
import authReducer from "./Auth/authSlice";
import eventsReducer from "./Slices/eventSlice";
import { schoolApi } from "./Apis/schoolsApi";
import { feedbackApi } from "./Apis/feedbackApis";
import { donationsApi } from "../pages/Donations/apis";
import { adminApi } from "../pages/AdminPage/apis";

export const store = configureStore({
    reducer :{
        auth : authReducer,
        events : eventsReducer,
        [authApi.reducerPath] :authApi.reducer,
        [userApi.reducerPath] :userApi.reducer,
        [eventApi.reducerPath] :eventApi.reducer,
        [schoolApi.reducerPath] :schoolApi.reducer,
        [feedbackApi.reducerPath] :feedbackApi.reducer,
        [adminApi.reducerPath] :adminApi.reducer
    },
    
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, eventApi.middleware,  schoolApi.middleware, feedbackApi.middleware, donationsApi.middleware, adminApi.middleware]),
})