import { createSlice } from "@reduxjs/toolkit";
import { todoAdded } from "../todos";

export interface Snackbar {
  message: string;
}
export const snackbarSlice = createSlice({
  name: "snackbars",
  initialState: [] as string[],
  reducers: {
    snackbarClosed(state) {
      state.shift();
    },
  },
  extraReducers(builder) {
    builder.addCase(todoAdded, (state, action) => {
      state.push(`Todo added: "${action.payload.text}"`);
    });
  },
  selectors: {
    selectFirstSnackbar: (snackbars) => snackbars[0],
  },
});

export const { snackbarClosed } = snackbarSlice.actions;

export const { selectFirstSnackbar } = snackbarSlice.selectors;
