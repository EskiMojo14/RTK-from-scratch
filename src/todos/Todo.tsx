import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  TodoActionType,
  selectTodoById,
  useTodoDispatch,
  useTodoSelector,
} from "./context";

export interface TodoProps {
  id: string;
}

export function TodoItem({ id }: TodoProps) {
  const todoDispatch = useTodoDispatch();
  const todo = useTodoSelector((state) => selectTodoById(state, id));
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
