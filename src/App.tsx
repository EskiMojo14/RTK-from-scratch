import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import { AddTodo } from "./todos/AddTodo";
import { Todos } from "./todos/Todos";
import { Todo } from "./todos";
import { Dispatch, SetStateAction, useState } from "react";

export interface RootState {
  todos: Todo[];
}

export interface RootStateProps {
  state: RootState;
  setState: Dispatch<SetStateAction<RootState>>;
}

function App() {
  const [state, setState] = useState<RootState>({
    todos: [],
  });
  const props: RootStateProps = {
    state,
    setState,
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todos</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ padding: 2 }}>
        <Paper>
          <Todos {...props} />
        </Paper>
      </Container>
      <AddTodo {...props} />
    </>
  );
}

export default App;
