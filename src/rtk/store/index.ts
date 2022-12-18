import { configureStore } from "@reduxjs/toolkit";
import documentSlice from "../features/documentSlice";
import loaderSlice from "../features/loaderSlice";
import alertSlice from "../features/alertSlice";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    documentSlice: documentSlice,
    loaderSlice: loaderSlice,
    alertSlice: alertSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
