import { Reducer, RootState } from "../store";
import { TodoAction, TodoActionType } from "../todos";

export interface Snackbar {
  message: string;
}

enum SnackbarActionType {
  SNACKBAR_CLOSED = "SNACKBAR_CLOSED",
}

export const snackbarClosed = () => ({
  type: SnackbarActionType.SNACKBAR_CLOSED as const,
});

type SnackbarAction = ReturnType<typeof snackbarClosed>;

export const snackbarReducer: Reducer<string[], SnackbarAction | TodoAction> = (
  state = [],
  action,
) => {
  switch (action.type) {
    case TodoActionType.TODO_ADDED:
      return [...state, `Todo added: "${action.payload.text}"`];
    case SnackbarActionType.SNACKBAR_CLOSED:
      return state.slice(1);
    default:
      return state;
  }
};

export const selectFirstSnackbar = (state: RootState) => state.snackbars[0];
