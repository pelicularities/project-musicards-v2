// REACT AND FRIENDS
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

// INTERNAL IMPORTS
import { REACT_APP_API_URL } from "../constants/api";

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
});

function AllDecks() {
  const [decks, setDecks] = useState([]);
  const classes = useStyles();

  const prepareDecks = (decks) => {
    if (!decks.length) return "loading...";
    return decks.map((deck) => {
      return (
        <Grid item key={deck._id} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card variant="outlined">
            <h3 className={classes.title}>{deck.title}</h3>
            <CardContent>
              <div className={classes.byline}>
                by {deck.username || "Anonymous"}
              </div>
              <div className={classes.description}>
                {deck.description || "no description"}
              </div>
            </CardContent>
            <CardActions className={classes.centeredContent}>
              <Button
                component={RouterLink}
                to={`/decks/${deck._id}`}
                variant="contained"
                color="secondary"
                disableElevation
              >
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className={classes.iconMargin}
                />
                More Info
              </Button>
              <Button
                component={RouterLink}
                to={`/decks/${deck._id}/play`}
                variant="contained"
                color="primary"
                disableElevation
              >
                <FontAwesomeIcon icon={faPlay} className={classes.iconMargin} />
                Play Deck
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  };

  useEffect(() => {
    const queryUrl = `${REACT_APP_API_URL}/decks`;
    fetch(queryUrl)
      .then((response) => response.json())
      .then((json) => {
        setDecks(json);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {prepareDecks(decks)}
    </Grid>
  );
}

export default AllDecks;
