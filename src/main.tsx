import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { grey, teal } from "@mui/material/colors";
import { store } from "./store";
import { Provider } from "react-redux";

const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal.A200,
    },
  },
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
