// REACT AND FRIENDS
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

// INTERNAL IMPORTS
import {
  validateUserInputs,
  validateUsername,
  validatePassword,
} from "../utils/validateUserInputs";
// import { REACT_APP_API_URL } from "../constants/api";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  newUserContainer: {
    width: "300px",
    margin: "0 auto",
  },
  bottomSpacing: {
    marginBottom: "1rem",
  },
});

function NewUser({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const [showUsernameError, setUsernameError] = useState(false);
  const [showPasswordError, setPasswordError] = useState(false);
  const [redirectToMain, setRedirectToMain] = useState(false);
  const classes = useStyles();

  const handleKeypress = (event) => {
    if (event.code === "Enter") {
      handleSubmit();
    }
  };

  const validateField = (field, value) => {
    const mapFieldToValidator = {
      username: {
        validator: validateUsername,
        setStatus: setUsernameError,
      },
      password: {
        validator: validatePassword,
        setStatus: setPasswordError,
      },
    };
    if (mapFieldToValidator[field]) {
      const validator = mapFieldToValidator[field].validator;
      const setStatus = mapFieldToValidator[field].setStatus;
      setStatus(!validator(value));
    }
  };

  const handleSubmit = async () => {
    if (!validateUserInputs(username, password)) {
      setFlashMessage("Invalid username and/or password.");
      return;
    }
    const requestUrl = `${process.env.REACT_APP_API_URL}/users/`;
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
    if (response.status === 201) {
      const json = await response.json();
      setUser(json);
      setRedirectToMain(true);
    } else {
      setFlashMessage(
        "Something went wrong, and we weren't able to create your account."
      );
    }
  };

  return (
    <div className={classes.newUserContainer}>
      {redirectToMain && <Redirect to="/" />}
      <h2>User Sign Up</h2>
      {flashMessage && (
        <Alert className={classes.bottomSpacing} severity="error">
          {flashMessage}
        </Alert>
      )}
      <form>
        <div>
          <TextField
            label="Username"
            autoComplete="username"
            autoFocus={true}
            error={showUsernameError}
            variant="outlined"
            className={classes.bottomSpacing}
            value={username}
            helperText="Min. 3 characters, letters only"
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeypress}
            onBlur={() => validateField("username", username)}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            error={showPasswordError}
            variant="outlined"
            className={classes.bottomSpacing}
            value={password}
            helperText="Min. 8 characters"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeypress}
            onBlur={() => validateField("password", password)}
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
