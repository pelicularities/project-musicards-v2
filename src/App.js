// REACT AND FRIENDS
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// THEMING
import theme from "./styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";

// EXTERNAL COMPONENTS

// INTERNAL COMPONENTS
import UserContext from "./contexts/UserContext";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewUser from "./components/NewUser";
import AllDecks from "./components/AllDecks";
import ViewDeck from "./components/ViewDeck";
import NewDeck from "./components/NewDeck";

// COMPONENT STYLE
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  app: {
    textAlign: "center",
  },
  container: {
    margin: theme.spacing(2),
  },
});

function App() {
  const classes = useStyles();
  const user = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <div className={classes.app}>
            <NavBar />
            <div className={classes.container}>
              <Switch>
                <Route exact path="/" render={() => "main page"} />
                <Route exact path="/decks" render={() => <AllDecks />} />
                <Route exact path="/decks/new" render={() => <NewDeck />} />
                <Route exact path="/decks/:deckId" component={ViewDeck} />
                <Route exact path="/users/new" render={() => <NewUser />} />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/logout" render={() => <Logout />} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
