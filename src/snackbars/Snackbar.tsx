import { Snackbar } from "@mui/material";
import { selectFirstSnackbar, snackbarClosed } from ".";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect, useState } from "react";

const useDelayedValue = <T,>(value: T, delay: number) => {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setCurrentValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return currentValue;
};

export function CurrentSnackbar() {
  const message = useAppSelector(selectFirstSnackbar);
  const delayedMessage = useDelayedValue(message, 500);
  const dispatch = useAppDispatch();
  return (
    <Snackbar
      open={!!message}
      message={message || delayedMessage}
      autoHideDuration={5000}
      onClose={() => dispatch(snackbarClosed())}
    />
  );
}
