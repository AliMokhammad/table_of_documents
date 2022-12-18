import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface LoaderSlice {
    isLoading: boolean;
}

const initialState: LoaderSlice = {
    isLoading: false,
};

export const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading;
        },
    },
});

export const { setLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
