// REACT AND FRIENDS
import React, { useState, useEffect } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { getCardsFromAPI } from "../actions";

// MATERIAL UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// EXTERNAL IMPORTS

// INTERNAL IMPORTS
// import { REACT_APP_API_URL } from "../constants/api";
import NewStave from "./NewStave";

// THEMING
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  addFlashcardForm: {
    width: "80%",
    maxWidth: "40rem",
    margin: "0 auto",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "40rem",
    margin: "0.5rem auto 1rem auto",
  },
  formInputs: {
    marginTop: "3rem",
    marginBottom: "0.5rem",
    display: "block",
  },
  iconMargin: {
    marginRight: "0.5rem",
  },
  marginTop: {
    marginTop: "3rem",
  },
});

function NewCard(props) {
  const deckId = props.match.params.deckId;
  const deckUrl = `/decks/${deckId}`;
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [redirectToDeck, setRedirect] = useState(false);
  const [hasFrontStave, setHasFrontStave] = useState(false);
  const [hasBackStave, setHasBackStave] = useState(false);
  const [frontStave, setFrontStave] = useState(null);
  const [backStave, setBackStave] = useState(null);

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSwitchChange = (variable, setState) => {
    setState(!variable);
  };

  const handleAddFlashcard = async () => {
    const requestUrl = `${process.env.REACT_APP_API_URL}${deckUrl}/cards`;
    const requestBody = { front: front, back: back };
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
      setRedirect(true);
    }
  };

  const handleStaveChange = (setStave) => {
    return (staveProps) => {
      const { clef, keySignature, timeSignature, notes } = staveProps;
      const stave = {
        clef: clef,
        keySignature: keySignature,
        timeSignature: timeSignature,
        notes: notes,
      };
      setStave(stave);
    };
  };

  useEffect(() => {
    if (hasFrontStave) {
      setFront([
        {
          type: "text",
          content: frontText,
        },
        {
          type: "stave",
          content: frontStave,
        },
      ]);
    } else {
      setFront([
        {
          type: "text",
          content: frontText,
        },
      ]);
    }
  }, [hasFrontStave, frontText, frontStave]);

  useEffect(() => {
    if (hasBackStave) {
      setBack([
        {
          type: "text",
          content: backText,
        },
        {
          type: "stave",
          content: backStave,
        },
      ]);
    } else {
      setBack([
        {
          type: "text",
          content: backText,
        },
      ]);
    }
  }, [hasBackStave, backText, backStave]);

  const classes = useStyles();
  return (
    <div>
      {redirectToDeck && <Redirect to={deckUrl} />}
      <div className={classes.buttonContainer}>
        <Button
          component={RouterLink}
          to={deckUrl}
          variant="outlined"
          color="primary"
          disableElevation
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={classes.iconMargin}
          />
          Back to Deck Overview
        </Button>
      </div>
      <form className={classes.addFlashcardForm}>
        <TextField
          className={classes.formInputs}
          label="Front Text"
          fullWidth
          variant="outlined"
          value={frontText}
          onChange={(e) => handleInputChange(e, setFrontText)}
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={hasFrontStave}
                onChange={() =>
                  handleSwitchChange(hasFrontStave, setHasFrontStave)
                }
                color="secondary"
                name="hasFrontStave"
              />
            }
            label="Add Music Stave to Front"
          />
        </FormGroup>
        {hasFrontStave && (
          <NewStave
            width={500}
            staveWidth={460}
            onStaveChange={handleStaveChange(setFrontStave)}
          />
        )}
        <TextField
          className={classes.formInputs}
          label="Back Text"
          fullWidth
          variant="outlined"
          value={backText}
          onChange={(e) => handleInputChange(e, setBackText)}
        />
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={hasBackStave}
                onChange={() =>
                  handleSwitchChange(hasBackStave, setHasBackStave)
                }
                color="secondary"
                name="hasBackStave"
              />
            }
            label="Add Music Stave to Back"
          />
        </FormGroup>
        {hasBackStave && (
          <NewStave
            width={500}
            staveWidth={460}
            onStaveChange={handleStaveChange(setBackStave)}
          />
        )}
        <div>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => handleAddFlashcard()}
            className={classes.marginTop}
          >
            Add New Flashcard
          </Button>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = {
  getCardsFromAPI,
};

export default connect(null, mapDispatchToProps)(NewCard);
