import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faCheckCircle,
  faTimesCircle,
  faRedoAlt,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PlayReport from "./PlayReport";

// REDUX
import { connect } from "react-redux";
import { getCardsFromAPI } from "../actions";

const useStyles = makeStyles({
  playContainer: {
    display: "inline-block",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "40rem",
    margin: "0.5rem auto 1rem auto",
  },
  playDeck: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  playFlashcard: {
    margin: "1rem",
    width: "30rem",
  },
  playControls: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  red: {
    color: "#FF2E00",
  },
  green: {
    color: "#53FF45",
  },
  grayLight: {
    color: "#C4c4c4",
  },
  clickable: {
    cursor: "pointer",
  },
  iconMargin: {
    marginRight: "0.5rem",
  },
});

function PlayDeck(props) {
  const deckId = props.match.params.deckId;
  const classes = useStyles();
  const [playthrough, setPlaythrough] = useState(
    props.cards.map((flashcard) => {
      return {
        ...flashcard,
        correct: false,
      };
    })
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [deckComplete, setDeckComplete] = useState(false);

  useEffect(() => {
    props.getCardsFromAPI(deckId);
  });

  const checkComplete = () => {
    if (countCorrect() === props.cards.length) setDeckComplete(true);
  };

  const nextCard = () => {
    let nextIndex = (currentIndex + 1) % props.cards.length;
    while (playthrough[nextIndex].correct) {
      if (allCorrect()) break;
      // if next card by index is already marked correct, skip it
      nextIndex = (nextIndex + 1) % props.cards.length;
    }
    setCurrentIndex(nextIndex);
  };

  const previousCard = () => {
    let previousIndex =
      (currentIndex + props.cards.length - 1) % props.cards.length;
    while (playthrough[previousIndex].correct) {
      if (allCorrect()) break;
      // if previous card by index is already marked correct, skip it
      previousIndex =
        (previousIndex + props.cards.length - 1) % props.cards.length;
    }
    setCurrentIndex(previousIndex);
  };

  const countCorrect = () => {
    return playthrough.reduce((score, flashcard) => {
      if (flashcard.correct) score++;
      return score;
    }, 0);
  };

  const countCardsLeft = () => props.cards.length - countCorrect();

  const allCorrect = () => {
    return countCorrect() === props.cards.length ? true : false;
  };

  const markCorrect = () => {
    const newPlaythroughArray = [...playthrough];
    newPlaythroughArray[currentIndex].correct = true;
    setPlaythrough(newPlaythroughArray);
    checkComplete();
    if (!deckComplete) {
      setAttempts(attempts + 1);
      setCorrectAttempts(correctAttempts + 1);
    }
    nextCard();
  };

  const markIncorrect = () => {
    if (!deckComplete) {
      setAttempts(attempts + 1);
    }
    nextCard();
  };

  const resetDeck = () => {
    const newPlaythrough = props.cards.map((flashcard) => {
      return {
        ...flashcard,
        correct: false,
      };
    });
    setPlaythrough(newPlaythrough);
    setCurrentIndex(0);
    setAttempts(0);
    setCorrectAttempts(0);
    setDeckComplete(false);
  };

  return (
    <div className={classes.playContainer}>
      <div className={classes.buttonContainer}>
        <Link to="/">
          <Button variant="outlined" color="primary" disableElevation>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={classes.iconMargin}
            />
            Back to Card Overview
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={resetDeck}
        >
          <FontAwesomeIcon icon={faRedoAlt} className={classes.iconMargin} />
          Reset Deck
        </Button>
      </div>
      <div>
        <strong>Cards left:</strong> {countCardsLeft()}
      </div>
      {deckComplete ? (
        <PlayReport cards={props.cards.length} attempts={attempts} />
      ) : (
        <div>
          <div className={classes.playDeck}>
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              size="3x"
              className={`${classes.grayLight} ${classes.clickable}`}
              onClick={previousCard}
            />
            <Flashcard
              flashcard={props.cards[currentIndex]}
              className={classes.playFlashcard}
            />
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              size="3x"
              className={`${classes.grayLight} ${classes.clickable}`}
              onClick={nextCard}
            />
          </div>
          <div className={classes.playControls}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              size="3x"
              className={`${classes.red} ${classes.clickable}`}
              onClick={markIncorrect}
            />
            <FontAwesomeIcon
              icon={faCheckCircle}
              size="3x"
              className={`${classes.green} ${classes.clickable}`}
              onClick={markCorrect}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { cards: state.cards };
};

const mapDispatchToProps = {
  getCardsFromAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayDeck);
