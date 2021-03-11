import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1E2EDE",
    },
    secondary: {
      main: "#F5B841",
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", sans-serif',
  },
});

export default theme;
