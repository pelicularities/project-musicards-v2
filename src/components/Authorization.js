// REACT AND FRIENDS
import React, { useContext } from "react";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  hideChildren: {
    display: "none",
  },
});

function Authorization(props) {
  // looks for a user prop containing a user ID
  // if the user prop matches the user ID from the context,
  // renders the children of this component
  // hides the children otherwise
  const { user } = useContext(UserContext);
  const classes = useStyles();
  if (user.name === props.user) {
    return props.children;
  }
  return <div className={classes.hideChildren}></div>;
}

export default Authorization;
