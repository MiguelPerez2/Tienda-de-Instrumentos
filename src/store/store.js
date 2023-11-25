import { configureStore } from '@reduxjs/toolkit';
import { authSlice, itemsSlice } from "./index.js";

export const store =configureStore({
    reducer:{
        auth:authSlice.reducer,
        cart_items:itemsSlice.reducer
    }
})