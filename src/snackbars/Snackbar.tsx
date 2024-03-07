import { Snackbar } from "@mui/material";
import { selectFirstSnackbar, snackbarClosed } from ".";
import { useDispatch, useSelector } from "../store";

export function CurrentSnackbar() {
  const message = useSelector(selectFirstSnackbar);
  const dispatch = useDispatch();
  return message ? (
    <Snackbar
      open
      message={message}
      autoHideDuration={5000}
      onClose={() => dispatch(snackbarClosed())}
    />
  ) : null;
}
