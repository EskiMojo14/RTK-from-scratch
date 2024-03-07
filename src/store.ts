import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "./todos";
import { snackbarSlice } from "./snackbars";
import { useDispatch, useSelector, useStore } from "react-redux";

const rootReducer = combineSlices(todoSlice, snackbarSlice);

export const store = configureStore({ reducer: rootReducer });

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<AppStore["getState"]>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
