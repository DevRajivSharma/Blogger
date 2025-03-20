import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from "../feature/authSlice.js";

const store = configureStore({
    reducer: {
        auth:AuthReducer
    }
})

export default store;