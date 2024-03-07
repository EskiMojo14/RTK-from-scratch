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

export interface TodoProps {
  todo: Todo;
  onCompletedChange: () => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onCompletedChange, onDelete }: TodoProps) {
  const labelId = `checkbox-list-label-${todo.id}`;
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton
        role={undefined}
        dense
        onClick={() => onCompletedChange()}
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
