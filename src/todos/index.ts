import { nanoid } from "@reduxjs/toolkit";
import { Reducer, RootState } from "../store";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  ids: string[];
  entities: Record<string, Todo>;
}

enum TodoActionType {
  TODO_ADDED = "TODO_ADDED",
  TODO_DELETED = "TODO_DELETED",
  TODO_TOGGLED = "TODO_TOGGLED",
}

export const todoAdded = (text: string) => ({
  type: TodoActionType.TODO_ADDED as const,
  payload: {
    id: nanoid(),
    text,
    completed: false,
  } satisfies Todo,
});

export const todoDeleted = (id: string) => ({
  type: TodoActionType.TODO_DELETED as const,
  payload: id,
});

export const todoToggled = (id: string) => ({
  type: TodoActionType.TODO_TOGGLED as const,
  payload: id,
});

type TodoAction = ReturnType<
  typeof todoAdded | typeof todoDeleted | typeof todoToggled
>;

export const todoReducer: Reducer<TodoState, TodoAction> = (
  state = {
    ids: [],
    entities: {},
  },
  action,
) => {
  switch (action.type) {
    case TodoActionType.TODO_ADDED:
      return {
        ids: [...state.ids, action.payload.id],
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      };
    case TodoActionType.TODO_DELETED: {
      const entitiesClone = { ...state.entities };
      delete entitiesClone[action.payload];
      return {
        ids: state.ids.filter((id) => id !== action.payload),
        entities: entitiesClone,
      };
    }
    case TodoActionType.TODO_TOGGLED:
      return {
        ids: state.ids,
        entities: {
          ...state.entities,
          [action.payload]: {
            ...state.entities[action.payload],
            completed: !state.entities[action.payload].completed,
          },
        },
      };
    default:
      return state;
  }
};

export const selectTodoIds = (state: RootState) => state.todos.ids;
export const selectTodoById = (state: RootState, id: string) =>
  state.todos.entities[id];
