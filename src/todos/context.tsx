import { createContext, useContext, useState } from "react";
import { Todo } from ".";

export interface TodoState {
  todos: Todo[];
}

const todoContext = createContext<TodoState>({
  todos: [],
});

export const useTodoContext = () => useContext(todoContext);

const setTodoContext = createContext<
  React.Dispatch<React.SetStateAction<TodoState>>
>(() => {});

export const useSetTodoContext = () => useContext(setTodoContext);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoState>({
    todos: [],
  });

  return (
    <todoContext.Provider value={todos}>
      <setTodoContext.Provider value={setTodos}>
        {children}
      </setTodoContext.Provider>
    </todoContext.Provider>
  );
}
