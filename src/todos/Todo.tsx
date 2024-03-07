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
import { TodoActionType, useTodoDispatch } from "./context";

export interface TodoProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoProps) {
  const todoDispatch = useTodoDispatch();
  const labelId = `checkbox-list-label-${todo.id}`;
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            todoDispatch({
              type: TodoActionType.TODO_DELETED,
              payload: todo.id,
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
          todoDispatch({
            type: TodoActionType.TODO_TOGGLED,
            payload: todo.id,
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
