// REACT AND FRIENDS
// import React from "react";

// MATERIAL UI
import Button from "@material-ui/core/Button";

// THEMING
// import theme from "../styles/theme";
import { withStyles } from "@material-ui/core/styles";

const WarningButton = withStyles((theme) => ({
  root: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.getContrastText(theme.palette.warning.main),
    },
  },
}))(Button);

export default WarningButton;
