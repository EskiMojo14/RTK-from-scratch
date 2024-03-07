import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Todo } from ".";

export interface TodoState {
  todos: Todo[];
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
        todos: [...state.todos, action.payload],
      };
    case TodoActionType.TODO_DELETED:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TodoActionType.TODO_TOGGLED:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    default:
      return state;
  }
};

const makeStore = () => {
  let state: TodoState = {
    todos: [],
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
  const selectedRef = useRef<Selected>(selector(getState()));
  const [, rerender] = useReducer((s) => !s, false);
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      selectedRef.current = selector(getState());
      rerender();
    });
    return unsubscribe;
  });
  return selectedRef.current;
};

export const useTodoDispatch = () => {
  return useContext(TodoContext).dispatch;
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  return <TodoContext.Provider value={store}>{children}</TodoContext.Provider>;
};
