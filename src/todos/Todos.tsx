import { Box, List, Typography } from "@mui/material";
import { TodoItem } from "./Todo";
import { RootStateProps } from "../App";

export interface TodosProps extends RootStateProps {}

export function Todos(props: TodosProps) {
  const {
    state: { todos },
  } = props;
  if (todos.length === 0) {
    return (
      <Box sx={{ p: 2 }} display="flex" justifyContent="center">
        <Typography
          variant="subtitle1"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          No todos
        </Typography>
      </Box>
    );
  }
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...props} />
      ))}
    </List>
  );
}
