import { nanoid } from "@reduxjs/toolkit";
import { todoReducer } from "./todos";
import { createContext, useContext, useSyncExternalStore } from "react";

export interface Action<T extends string = string> {
  type: T;
}

export type Reducer<S, A extends Action, P = S> = (
  state: S | P | undefined,
  action: A,
) => S;

function combineReducers<State extends Record<string, any>>(reducers: {
  [K in keyof State]: Reducer<State[K], any>;
}): Reducer<State, Action, Partial<State>> {
  const reducerKeys = Object.keys(reducers) as (keyof State)[];
  return (state = {}, action) => {
    let updated = false;
    const newState = {} as State;
    for (const key of reducerKeys) {
      const nextState = reducers[key](state[key], action);
      newState[key] = nextState;
      updated = updated || nextState !== state[key];
    }
    return updated ? newState : (state as State);
  };
}

const combinedReducer = combineReducers({
  todos: todoReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

const makeStore = () => {
  let state = combinedReducer(undefined, { type: "INIT" + nanoid() });

  let listenerId = 0;
  const listeners = new Map<number, () => void>();

  function getState() {
    return state;
  }

  function dispatch(action: Action) {
    state = combinedReducer(state, action);
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

const StoreContext = createContext(store);

export const useSelector = <Selected,>(
  selector: (state: RootState) => Selected,
) => {
  const store = useContext(StoreContext);
  return useSyncExternalStore(store.subscribe, () =>
    selector(store.getState()),
  );
};

export const useDispatch = () => {
  const store = useContext(StoreContext);
  return store.dispatch;
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
