// REACT AND FRIENDS
import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

// MATERIAL UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";

// COMPONENT STYLE
const useStyles = makeStyles({
  formSpacing: {
    marginBottom: "1rem",
  },
});

function NewDeck() {
  const [user] = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deckId, setDeckId] = useState(null);
  const [redirectToDeck, setRedirectToDeck] = useState(false);
  const classes = useStyles();

  const handleSubmit = async () => {
    if (title) {
      const requestUrl = "https://express-musicards-test.herokuapp.com/decks/";
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
      console.log(response);
      console.log(response.status);
      if (response.status === 201) {
        const newDeck = response.json();
        setDeckId(newDeck._id);
        setRedirectToDeck(true);
      }
    } else {
      console.log("nope");
    }
  };

  return (
    <div>
      {redirectToDeck && <Redirect to={`/decks/${deckId}`} />}
      <h2>New Deck</h2>
      <form>
        <div>
          <TextField
            label="Deck Name"
            variant="outlined"
            className={classes.formSpacing}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Description"
            autoComplete="new-password"
            variant="outlined"
            className={classes.formSpacing}
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
  );
}

export default NewDeck;
