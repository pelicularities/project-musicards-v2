// REACT AND FRIENDS
import React, { useState, useEffect } from "react";

// REDUX
import { connect } from "react-redux";
import { getCardsFromAPI } from "../actions";

// MATERIAL UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Alert from "@material-ui/lab/Alert";

// EXTERNAL IMPORTS

// INTERNAL IMPORTS
import NewStave from "./NewStave";

// THEMING
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  addFlashcardForm: {
    width: "40rem",
    margin: "1rem",
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
  alignRight: {
    textAlign: "right",
  },
});

function NewCard({ deckId, setNewCardDialog, getCardsFromAPI }) {
  const deckUrl = `/decks/${deckId}`;
  const [flashMessage, setFlashMessage] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [showFrontError, setFrontError] = useState(false);
  const [showBackError, setBackError] = useState(false);
  const [hasFrontStave, setHasFrontStave] = useState(false);
  const [hasBackStave, setHasBackStave] = useState(false);
  const [frontStave, setFrontStave] = useState(null);
  const [backStave, setBackStave] = useState(null);
  const classes = useStyles();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSwitchChange = (variable, setState) => {
    setState(!variable);
  };

  const validateField = (field, setError) => {
    setError(!field);
  };

  const validateFlashcard = (frontText, backText) => {
    // front text and back text cannot be empty
    // there is NO back-end validation for this
    return frontText.length && backText.length;
  };

  const handleAddFlashcard = async () => {
    if (validateFlashcard(frontText, backText)) {
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
        setNewCardDialog(false);
        getCardsFromAPI(deckId);
      } else {
        setFlashMessage(
          "Something went wrong and we weren't able to create your card."
        );
      }
    } else {
      setFlashMessage("Both front and back text are required.");
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

  return (
    <div>
      <form className={classes.addFlashcardForm}>
        {flashMessage && (
          <Alert className={classes.bottomSpacing} severity="error">
            {flashMessage}
          </Alert>
        )}
        <TextField
          className={classes.formInputs}
          label="Front Text"
          fullWidth
          variant="outlined"
          error={showFrontError}
          value={frontText}
          helperText="Required"
          onChange={(e) => handleInputChange(e, setFrontText)}
          onBlur={(e) => validateField(e.target.value.length, setFrontError)}
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
          error={showBackError}
          value={backText}
          helperText="Required"
          onChange={(e) => handleInputChange(e, setBackText)}
          onBlur={(e) => validateField(e.target.value.length, setBackError)}
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
        <div className={classes.alignRight}>
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
