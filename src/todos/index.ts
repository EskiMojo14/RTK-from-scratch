import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  ids: string[];
  entities: Record<string, Todo>;
}

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    ids: [],
    entities: {},
  } as TodoState,
  reducers: {
    todoAdded: {
      prepare: (text: string) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
        } satisfies Todo,
      }),
      reducer(state, action: PayloadAction<Todo>) {
        state.ids.push(action.payload.id);
        state.entities[action.payload.id] = action.payload;
      },
    },
    todoDeleted(state, action: PayloadAction<string>) {
      delete state.entities[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  selectors: {
    selectTodoIds: (state) => state.ids,
    selectTodoById: (state, id: string) => state.entities[id],
  },
});

export const { todoAdded, todoDeleted, todoToggled } = todoSlice.actions;

export const { selectTodoIds, selectTodoById } = todoSlice.selectors;
