import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from "../feature/authSlice.js";

const store = configureStore({
    reducer: {
        AuthReducer
    }
})

export default store;