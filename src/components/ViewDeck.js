// REACT AND FRIENDS
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import { getCardsFromAPI } from "../actions";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

// EXTERNAL IMPORTS

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
import Flashcard from "./Flashcard";
import Authorization from "./Authorization";
import NewCard from "./NewCard";
import Loader from "./Loader";
import WarningButton from "./WarningButton";
import ConfirmDialog from "./ConfirmDialog";

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
  iconMargin: {
    marginRight: "0.5rem",
  },
  warningButton: {
    marginLeft: "1rem",
  },
});

function ViewDeck(props) {
  const { user } = useContext(UserContext);
  const deckId = props.match.params.deckId;
  const deckQueryUrl = `${process.env.REACT_APP_API_URL}/decks/${deckId}`;
  const [isLoading, setIsLoading] = useState(true);
  const [deck, setDeck] = useState({});
  const [openNewCardDialog, setNewCardDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [redirectToAllDecks, setRedirectToAllDecks] = useState(false);
  const classes = useStyles();

  const prepareCards = (cards) => {
    const isAuthorized = !!user && user.id === deck.userId;
    if (!cards) return "loading...";
    if (!cards.length) return "This deck has no cards :(";
    return cards.map((card) => {
      return (
        <Grid item key={card._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Flashcard
            key={card._id}
            deckId={deckId}
            flashcardId={card._id}
            flashcard={card}
            setFlashMessage={setFlashMessage}
            isAuthorized={isAuthorized}
          />
        </Grid>
      );
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(deckQueryUrl)
      .then((response) => response.json())
      .then((deckJson) => {
        setDeck(deckJson);
        props.getCardsFromAPI(deckId);
        // setIsLoading(false);
      });
  }, [deckId]);

  const handleDeckDelete = async () => {
    const requestOptions = {
      method: "DELETE",
      credentials: "include",
    };
    const response = await fetch(deckQueryUrl, requestOptions);
    if (response.status === 200) {
      setRedirectToAllDecks(true);
    } else if (response.status === 401) {
      setFlashMessage("Please log in in order to delete this deck.");
    } else if (response.status === 403) {
      setFlashMessage("You do not have permission to delete this deck.");
    } else {
      setFlashMessage(
        "Something went wrong and we weren't able to delete the deck."
      );
    }
  };

  useLayoutEffect(() => {
    setIsLoading(false);
  }, [props.cards]);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={2}>
      {redirectToAllDecks && <Redirect to="/decks" />}
      <Grid item key="deckInfo" xs={12}>
        <h2>{deck.title}</h2>
        {deck.description || <em>this deck has no description</em>}
      </Grid>

      <Grid item key="toolbar-left" xs={6}>
        {!!props.cards.length && (
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
        )}
      </Grid>
      <Grid item key="toolbar-right" xs={6}>
        <Authorization user={deck.userId}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => setNewCardDialog(true)}
          >
            <FontAwesomeIcon icon={faPlus} className={classes.iconMargin} /> Add
            Card
          </Button>
          <Dialog
            open={openNewCardDialog}
            onClose={() => setNewCardDialog(false)}
            maxWidth="xl"
          >
            <NewCard deckId={deckId} setNewCardDialog={setNewCardDialog} />
          </Dialog>
          <WarningButton
            variant="outlined"
            className={classes.warningButton}
            disableElevation
            onClick={() => setDeleteDialog(true)}
          >
            <FontAwesomeIcon icon={faTrash} className={classes.iconMargin} />{" "}
            Delete Deck
          </WarningButton>
          <ConfirmDialog
            title="Delete Deck?"
            open={openDeleteDialog}
            setOpen={setDeleteDialog}
            onConfirm={handleDeckDelete}
          >
            Are you sure you want to delete this deck?
          </ConfirmDialog>
        </Authorization>
      </Grid>
      {flashMessage && (
        <Grid item key="flashMessage" xs={12}>
          <Alert className={classes.bottomSpacing} severity="error">
            {flashMessage}
          </Alert>
        </Grid>
      )}
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
