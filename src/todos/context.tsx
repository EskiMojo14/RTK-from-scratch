import { createContext, useContext, useSyncExternalStore } from "react";
import { Todo } from ".";

export interface TodoState {
  todos: {
    ids: string[];
    entities: Record<string, Todo>;
  };
}

export enum TodoActionType {
  TODO_ADDED = "TODO_ADDED",
  TODO_DELETED = "TODO_DELETED",
  TODO_TOGGLED = "TODO_TOGGLED",
}

type TodoAddedAction = {
  type: TodoActionType.TODO_ADDED;
  payload: Todo;
};

type TodoDeletedAction = {
  type: TodoActionType.TODO_DELETED;
  payload: string;
};

type TodoToggledAction = {
  type: TodoActionType.TODO_TOGGLED;
  payload: string;
};

type TodoAction = TodoAddedAction | TodoDeletedAction | TodoToggledAction;

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case TodoActionType.TODO_ADDED:
      return {
        todos: {
          ids: [...state.todos.ids, action.payload.id],
          entities: {
            ...state.todos.entities,
            [action.payload.id]: action.payload,
          },
        },
      };
    case TodoActionType.TODO_DELETED: {
      const entitiesClone = { ...state.todos.entities };
      delete entitiesClone[action.payload];
      return {
        todos: {
          ids: state.todos.ids.filter((id) => id !== action.payload),
          entities: entitiesClone,
        },
      };
    }
    case TodoActionType.TODO_TOGGLED:
      return {
        todos: {
          ids: state.todos.ids,
          entities: {
            ...state.todos.entities,
            [action.payload]: {
              ...state.todos.entities[action.payload],
              completed: !state.todos.entities[action.payload].completed,
            },
          },
        },
      };
    default:
      return state;
  }
};

export const selectTodoIds = (state: TodoState) => state.todos.ids;
export const selectTodoById = (state: TodoState, id: string) =>
  state.todos.entities[id];

const makeStore = () => {
  let state: TodoState = {
    todos: {
      ids: [],
      entities: {},
    },
  };

  let listenerId = 0;
  const listeners = new Map<number, () => void>();

  function getState() {
    return state;
  }

  function dispatch(action: TodoAction) {
    state = todoReducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    const id = listenerId++;
    listeners.set(id, listener);
    return () => {
      listeners.delete(id);
    };
  }

  return { getState, dispatch, subscribe };
};

const store = makeStore();

export const TodoContext = createContext(store);

export const useTodoSelector = <Selected,>(
  selector: (state: TodoState) => Selected,
) => {
  const { getState, subscribe } = useContext(TodoContext);
  return useSyncExternalStore(subscribe, () => selector(getState()));
};

export const useTodoDispatch = () => {
  return useContext(TodoContext).dispatch;
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  return <TodoContext.Provider value={store}>{children}</TodoContext.Provider>;
};
