// REACT AND FRIENDS
import React, { useState } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Alert from "@material-ui/lab/Alert";

// INTERNAL IMPORTS
import { validateUserInputs } from "../utils/validateUserInputs";
// import { REACT_APP_API_URL } from "../constants/api";

// THEMING
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  loginContainer: {
    width: "300px",
    margin: "0 auto",
  },
  bottomSpacing: {
    marginBottom: "1rem",
  },
});

function Login({ setUser, loginRequired, redirectTo = "/" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [flashMessage, setFlashMessage] = useState(
    loginRequired ? "Please log in to access this page." : null
  );

  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const handleKeypress = (event) => {
    if (event.code === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!validateUserInputs(username, password)) {
      setFlashMessage("Invalid login credentials.");
      return;
    }
    const requestUrl = `${process.env.REACT_APP_API_URL}/users/login`;
    const requestBody = {
      username: username,
      password: password,
    };
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    const response = await fetch(requestUrl, requestOptions);
    if (response.status === 200) {
      const json = await response.json();
      setUser(json);
      setRedirect(true);
    } else {
      setFlashMessage("Incorrect username and/or password.");
    }
  };

  return (
    <div className={classes.loginContainer}>
      {redirect && <Redirect to={redirectTo} />}
      <h2>User Login</h2>
      {flashMessage && (
        <Alert className={classes.bottomSpacing} severity="error">
          {flashMessage}
        </Alert>
      )}
      <form className={classes.bottomSpacing}>
        <div>
          <TextField
            label="Username"
            autoComplete="username"
            autoFocus={true}
            variant="outlined"
            className={classes.bottomSpacing}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeypress}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            variant="outlined"
            className={classes.bottomSpacing}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeypress}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </div>
      </form>
      <div>
        No account yet?{" "}
        <Link component={RouterLink} to="/users/new">
          Sign up!
        </Link>
      </div>
    </div>
  );
}

export default Login;
