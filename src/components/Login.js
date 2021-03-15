// REACT AND FRIENDS
import React, { useState, useContext } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
import { REACT_APP_API_URL } from "../constants/api";

const useStyles = makeStyles({
  bottomSpacing: {
    marginBottom: "1rem",
  },
});

function Login() {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToMain, setRedirectToMain] = useState(false);
  const classes = useStyles();

  const handleSubmit = async () => {
    const requestUrl = `${REACT_APP_API_URL}/users/login`;
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
    console.log(response);
    console.log(response.status);
    if (response.status === 200) {
      console.log("successful login");
      setUser(username);
      setRedirectToMain(true);
    } else {
      console.log("invalid credentials");
    }
  };

  return (
    <div>
      {redirectToMain && <Redirect to="/" />}
      <h2>User Login</h2>
      <form className={classes.bottomSpacing}>
        <div>
          <TextField
            label="Username"
            autoComplete="username"
            variant="outlined"
            className={classes.bottomSpacing}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
