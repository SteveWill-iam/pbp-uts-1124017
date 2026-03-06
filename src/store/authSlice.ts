import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuInfo } from "../types";

export type AuthState = {
    menuInfo?: MenuInfo;
}

const initialState: AuthState = {
    menuInfo: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer untuk menyimpan data user setelah login
        setUserInfo: (state, action: PayloadAction<MenuInfo | undefined>) => {
            state.menuInfo = action.payload;
        },
    }
})

export const authActions = authSlice.actions; 
export const authReducer = authSlice.reducer;