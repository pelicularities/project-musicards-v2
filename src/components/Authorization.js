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
  // looks for a user prop containing a username
  // if the user prop matches the username from the context,
  // renders the children of this component
  // hides the children otherwise
  const user = useContext(UserContext);
  const classes = useStyles();
  if (user === props.user) {
    // potentially user.username instead?
    return props.children;
  }
  return <div className={classes.hideChildren}></div>;
}

export default Authorization;
