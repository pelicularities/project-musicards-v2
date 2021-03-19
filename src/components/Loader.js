// REACT AND FRIENDS
import React from "react";

// EXTERNAL IMPORTS
import ReactLoaderSpinner from "react-loader-spinner";

// THEMING
import theme from "../styles/theme";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loader: {
    marginTop: theme.spacing(6),
  },
});

function Loader() {
  const classes = useStyles();
  return (
    <ReactLoaderSpinner
      className={classes.loader}
      color={theme.palette.primary.main}
      height={150}
      width={150}
      type="TailSpin"
    />
  );
}

export default Loader;
