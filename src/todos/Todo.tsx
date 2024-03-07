import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { selectTodoById, todoDeleted, todoToggled } from ".";
import { useDispatch, useSelector } from "../store";

export interface TodoProps {
  id: string;
}

export function TodoItem({ id }: TodoProps) {
  const todoDispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, id));
  if (!todo) {
    return null;
  }
  const labelId = `checkbox-list-label-${todo.id}`;
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            todoDispatch(todoDeleted(todo.id));
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
          todoDispatch(todoToggled(todo.id));
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
