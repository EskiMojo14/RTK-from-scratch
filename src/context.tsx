import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Todo } from "./todos";

export interface RootState {
  todos: Todo[];
}

const stateContext = createContext<RootState>({
  todos: [],
});

export const useRootState = () => useContext(stateContext);

const setStateContext = createContext<Dispatch<SetStateAction<RootState>>>(
  () => {},
);

export const useSetRootState = () => useContext(setStateContext);

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RootState>({
    todos: [],
  });
  return (
    <setStateContext.Provider value={setState}>
      <stateContext.Provider value={state}>{children}</stateContext.Provider>
    </setStateContext.Provider>
  );
}
