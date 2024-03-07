import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todos</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;
