import { createContext, useContext, useReducer } from "react";
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

const todoContext = createContext<TodoState>({
  todos: [],
});

export const useTodoContext = () => useContext(todoContext);

const todoDispatchContext = createContext<React.Dispatch<TodoAction>>(() => {});

export const useTodoDispatch = () => useContext(todoDispatchContext);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useReducer(todoReducer, { todos: [] });

  return (
    <todoContext.Provider value={todos}>
      <todoDispatchContext.Provider value={setTodos}>
        {children}
      </todoDispatchContext.Provider>
    </todoContext.Provider>
  );
}
