// REACT AND FRIENDS
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { getCardsFromAPI } from "../actions";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// INTERNAL IMPORTS
import Flashcard from "./Flashcard";
import Authorization from "./Authorization";
import NewCard from "./NewCard";

// THEMING
import theme from "../styles/theme";
import { makeStyles } from "@material-ui/core/styles";

// COMPONENT STYLE
const useStyles = makeStyles({
  centeredContent: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: 0,
  },
  byline: {
    marginBottom: theme.spacing(2),
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    height: "2.25rem",
  },
  toolbar: {
    width: "100%",
    maxWidth: "40rem",
    margin: "0 auto 1rem auto",
    display: "flex",
    justifyContent: "space-between",
  },
  iconMargin: {
    marginRight: "0.5rem",
  },
});

function ViewDeck(props) {
  const deckId = props.match.params.deckId;
  const [deck, setDeck] = useState({});
  const [openNewCardDialog, setNewCardDialog] = useState(false);
  const classes = useStyles();

  const prepareCards = (cards) => {
    if (!cards) return "loading...";
    if (!cards.length) return "This deck has no cards :(";
    return cards.map((card) => {
      return (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Flashcard key={card._id} flashcard={card} />
        </Grid>
      );
    });
  };

  useEffect(() => {
    const deckQueryUrl = `${process.env.REACT_APP_API_URL}/decks/${deckId}`;
    fetch(deckQueryUrl)
      .then((response) => response.json())
      .then((deckJson) => {
        setDeck(deckJson);
      });

    props.getCardsFromAPI(deckId);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item key="deckInfo" xs={12}>
        <h2>{deck.title}</h2>
        {deck.description || <em>this deck has no description</em>}
      </Grid>
      <Grid item key="toolbar" xs={12}>
        <div className={classes.toolbar}>
          <Button
            component={RouterLink}
            to={`/decks/${deckId}/play`}
            variant="contained"
            color="primary"
            disableElevation
          >
            <FontAwesomeIcon icon={faPlay} className={classes.iconMargin} />{" "}
            Play Deck
          </Button>

          <Authorization user={deck.userId}>
            <Button
              // component={RouterLink}
              // to={`/decks/${deckId}/cards/new`}
              variant="contained"
              color="secondary"
              disableElevation
              onClick={() => setNewCardDialog(true)}
            >
              <FontAwesomeIcon icon={faPlus} className={classes.iconMargin} />{" "}
              Add Card
            </Button>
            <Dialog
              open={openNewCardDialog}
              onClose={() => setNewCardDialog(false)}
              maxWidth="xl"
            >
              <NewCard deckId={deckId} setNewCardDialog={setNewCardDialog} />
            </Dialog>
          </Authorization>
        </div>
      </Grid>
      {prepareCards(props.cards)}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return { cards: state.cards };
};

const mapDispatchToProps = {
  getCardsFromAPI,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDeck);
