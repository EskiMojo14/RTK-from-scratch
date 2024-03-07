import { AppBar, Container, Paper, Toolbar, Typography } from "@mui/material";
import { AddTodo } from "./todos/AddTodo";
import { Todos } from "./todos/Todos";
import { CurrentSnackbar } from "./snackbars/Snackbar";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todos</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ padding: 2 }}>
        <Paper>
          <Todos />
        </Paper>
      </Container>
      <AddTodo />
      <CurrentSnackbar />
    </>
  );
}

export default App;
