// REACT AND FRIENDS
import React, { useState, useLayoutEffect } from "react";

// REDUX
import { connect } from "react-redux";
import { getCardsFromAPI } from "../actions";

// MATERIAL UI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

// EXTERNAL IMPORTS
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";

// INTERNAL IMPORTS
import Stave from "./Stave";
import ConfirmDialog from "./ConfirmDialog";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  wrapper: {
    position: "relative",
  },
  flashcard: {
    borderRadius: "0.25rem",
    height: "12rem",
    padding: "1rem",
    fontSize: "1.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  backOfCard: {
    border: "1px solid #000000",
  },
  largeStave: {
    alignSelf: "flex-start",
  },
  deleteButton: {
    position: "absolute",
    top: "0px",
    right: "0px",
  },
  iconMargin: {
    margin: "0.5rem auto",
  },
});

function Flashcard({
  flashcard = {},
  className,
  isAuthorized = false,
  getCardsFromAPI,
  deckId,
  flashcardId,
  setFlashMessage,
}) {
  const classes = useStyles();
  const { front, back } = flashcard;
  const [isFront, setIsFront] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deckUrl = `/decks/${deckId}`;
  const cardUrl = `${process.env.REACT_APP_API_URL}${deckUrl}/cards/${flashcardId}`;

  useLayoutEffect(() => {
    setIsFront(true);
  }, [flashcard]);

  const flipCard = () => {
    setIsFront(!isFront);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(event);
    setConfirmOpen(true);
  };

  const handleFlashcardDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      credentials: "include",
    };
    const response = await fetch(cardUrl, requestOptions);
    if (response.status === 200) {
      getCardsFromAPI(deckId);
    } else if (response.status === 401) {
      setFlashMessage("Please log in in order to delete this card.");
    } else if (response.status === 403) {
      setFlashMessage("You do not have permission to delete this card.");
    } else {
      setFlashMessage(
        "Something went wrong and we weren't able to delete the card."
      );
    }
  };

  const prepareLayout = (side) => {
    // front and back will be an array of objects
    // each object has the keys "type" and "content"
    // we want the content to be rendered based on the type
    if (!side) return;
    if (!side.length) return;

    return side.map((section) => {
      if (section.type === "text") {
        return <div key={uuidv4()}>{section.content}</div>;
      }
      if (section.type === "stave") {
        return (
          <Stave
            id={uuidv4()}
            key={Math.random()}
            clef={section.content.clef}
            timeSignature={section.content.timeSignature}
            keySignature={section.content.keySignature}
            notes={section.content.notes}
          />
        );
      }
    });
  };

  return (
    <div className={classes.wrapper}>
      <Card
        className={clsx(className, classes.flashcard, {
          [classes.backOfCard]: !isFront,
        })}
        variant="outlined"
        onClick={flipCard}
      >
        {isFront ? prepareLayout(front) : prepareLayout(back)}
      </Card>
      {isAuthorized && (
        <>
          <Button
            className={classes.deleteButton}
            onClick={(e) => handleDeleteClick(e)}
            aria-haspopup="true"
          >
            <FontAwesomeIcon icon={faTrash} className={classes.iconMargin} />
          </Button>

          <ConfirmDialog
            title="Delete Flashcard?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={(e) => handleFlashcardDelete(e)}
          >
            Are you sure you want to delete this flashcard?
          </ConfirmDialog>
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  getCardsFromAPI,
};

export default connect(null, mapDispatchToProps)(Flashcard);
