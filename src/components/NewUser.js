// REACT AND FRIENDS
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
import { REACT_APP_API_URL } from "../constants/api";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  formSpacing: {
    marginBottom: "1rem",
  },
});

function NewUser({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToMain, setRedirectToMain] = useState(false);
  const classes = useStyles();

  const validateInputs = (username, password) => {
    // username must be 3 characters or longer, letters only
    // password must be 8 characters or longer
    if (username.length < 3) return false;
    if (password.length < 8) return false;
    return /^[A-Za-z]+$/.test(username);
  };

  const handleSubmit = async () => {
    if (validateInputs(username, password)) {
      const requestUrl = `${REACT_APP_API_URL}/users/`;
      const requestBody = {
        username: username,
        password: password,
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(requestUrl, requestOptions);
      console.log(response);
      console.log(response.status);
      if (response.status === 201) {
        setUser(username);
        setRedirectToMain(true);
      }
    } else {
      console.log("nope");
    }
  };

  return (
    <div>
      {redirectToMain && <Redirect to="/" />}
      <h2>User Sign Up</h2>
      <form>
        <div>
          <TextField
            label="Username"
            autoComplete="username"
            variant="outlined"
            className={classes.formSpacing}
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
            className={classes.formSpacing}
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
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewUser;
