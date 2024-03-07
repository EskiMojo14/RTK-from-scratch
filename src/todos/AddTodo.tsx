import { Add } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { todoAdded, useTodoDispatch } from "./context";

export interface AddTodoProps {}

export function AddTodo() {
  const todoDispatch = useTodoDispatch();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleSubmit = () => {
    todoDispatch(todoAdded(text));
    setOpen(false);
    setText("");
  };
  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        sx={{
          position: "absolute",
          bottom: 32,
          right: 32,
        }}
        onClick={() => setOpen(true)}
      >
        <Add sx={{ mr: 1 }} />
        Add Todo
      </Fab>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            label="Name"
            fullWidth
            value={text}
            variant="filled"
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
