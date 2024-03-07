import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Todo } from ".";
import { Delete } from "@mui/icons-material";
import { useSetTodoContext } from "./context";

export interface TodoProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoProps) {
  const setTodos = useSetTodoContext();
  const labelId = `checkbox-list-label-${todo.id}`;
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            setTodos((prev) => {
              return {
                ...prev,
                todos: prev.todos.filter((t) => t.id !== todo.id),
              };
            });
          }}
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton
        role={undefined}
        dense
        onClick={() => {
          setTodos((prev) => {
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
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.text} />
      </ListItemButton>
    </ListItem>
  );
}
