import {
  createEntityAdapter,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todoAdapter = createEntityAdapter<Todo>();

export const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState(),
  reducers: {
    todoAdded: {
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
        } satisfies Todo,
      }),
      reducer: todoAdapter.addOne,
    },
    todoDeleted: todoAdapter.removeOne,
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  selectors: {
    ...todoAdapter.getSelectors(),
  },
});

export const { todoAdded, todoDeleted, todoToggled } = todoSlice.actions;

export const { selectIds: selectTodoIds, selectById: selectTodoById } =
  todoSlice.selectors;
