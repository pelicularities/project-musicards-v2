// REACT AND FRIENDS
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
import Login from "./Login";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  newDeckContainer: {
    width: "300px",
    margin: "0 auto",
  },
  bottomSpacing: {
    marginBottom: "1rem",
  },
});

function NewDeck() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const [showTitleError, setTitleError] = useState(false);
  const [deckId, setDeckId] = useState(null);
  const [redirectToDeck, setRedirectToDeck] = useState(false);
  const classes = useStyles();

  const validateTitle = (title) => {
    setTitleError(!title);
  };

  const handleSubmit = async () => {
    if (title) {
      const requestUrl = `${process.env.REACT_APP_API_URL}/decks/`;
      const requestBody = {
        title: title,
      };
      if (description) requestBody.description = description;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      };
      const response = await fetch(requestUrl, requestOptions);
      if (response.status === 201) {
        const newDeck = await response.json();
        setDeckId(newDeck._id);
        setRedirectToDeck(true);
      } else {
        setFlashMessage(
          "Something went wrong, and we weren't able to create the deck."
        );
      }
    } else {
      setFlashMessage("Please give your new deck a title.");
    }
  };

  return user ? (
    <div className={classes.newDeckContainer}>
      {redirectToDeck && <Redirect to={`/decks/${deckId}`} />}
      <h2>New Deck</h2>
      {flashMessage && (
        <Alert className={classes.bottomSpacing} severity="error">
          {flashMessage}
        </Alert>
      )}
      <form>
        <div>
          <TextField
            label="Deck Name"
            variant="outlined"
            className={classes.bottomSpacing}
            value={title}
            error={showTitleError}
            helperText="Required"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => validateTitle(title)}
          />
        </div>
        <div>
          <TextField
            label="Description"
            autoComplete="new-password"
            variant="outlined"
            className={classes.bottomSpacing}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleSubmit}
          >
            Create Deck
          </Button>
        </div>
      </form>
    </div>
  ) : (
    <Login loginRequired={true} redirectTo="/decks/new" />
  );
}

export default NewDeck;
