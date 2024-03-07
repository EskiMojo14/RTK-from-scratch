import { List } from "@mui/material";
import { useRootState, useSetRootState } from "../context";
import { TodoItem } from "./Todo";

export function Todos() {
  const { todos } = useRootState();
  const setRootState = useSetRootState();
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCompletedChange={() => {
            setRootState((prev) => {
              return {
                ...prev,
                todos: prev.todos.map((t) => {
                  if (t.id === todo.id) {
                    return { ...t, completed: !t.completed };
                  }
                  return t;
                }),
              };
            });
          }}
          onDelete={() => {
            setRootState((prev) => {
              return {
                ...prev,
                todos: prev.todos.filter((t) => t.id !== todo.id),
              };
            });
          }}
        />
      ))}
    </List>
  );
}
