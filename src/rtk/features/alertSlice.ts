import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AlertSlice {
    success: boolean;
    msg: string;
}

const initialState: AlertSlice = {
    success: false,
    msg: ""
};

export const alertSlice = createSlice({
    name: "alertSlice",
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<{ success: boolean, msg: string }>) => {
            state.success = action.payload.success;
            state.msg = action.payload.msg;
        },
    },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
