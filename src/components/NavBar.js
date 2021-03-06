// REACT AND FRIENDS
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

// MATERIAL UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
import UserMenu from "./UserMenu";

// COMPONENT STYLE
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
  },
  leftMenu: {
    width: "auto",
    margin: "auto auto auto 0",
  },
  rightMenu: {
    width: "auto",
    margin: "auto 0 auto auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: "bold",
  },
}));

function NavBar() {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" variant="outlined">
        <Toolbar className={classes.toolbar}>
          <div className={classes.leftMenu}>
            <Button
              component={RouterLink}
              color="inherit"
              to="/decks"
              className={classes.menuButton}
            >
              All decks
            </Button>
          </div>
          <Typography
            component={RouterLink}
            to="/"
            variant="h4"
            className={classes.title}
          >
            Musicards
          </Typography>
          <div className={classes.rightMenu}>
            {user ? (
              <UserMenu />
            ) : (
              <Button component={RouterLink} color="inherit" to="/login">
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
