import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user: null,
    token: localStorage.getItem('token') | null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state, action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('id',String(action.payload.user.id))
            localStorage.setItem('role',String(action.payload.user.role))
        },
        logoutUser:(state)=>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('role')
        }
    }
})

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;