import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.userData=action.payload;
        },
        logout: (state) => {
            state.status=false;
            state.userData=null;
        },
        verifyStatus : (state) => {
            state.status=true;
        }
    }
});

export const {login, logout,verifyStatus} = authSlice.actions;
export default authSlice.reducer;