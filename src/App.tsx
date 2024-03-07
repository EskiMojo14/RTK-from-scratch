import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { AddTodo } from "./todos/AddTodo";
import { Todos } from "./todos/Todos";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todos</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Todos />
      </Container>
      <AddTodo />
    </>
  );
}

export default App;
