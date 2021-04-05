// REACT AND FRIENDS
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import store from "./store";

// THEMING
import theme from "./styles/theme";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

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
import PlayDeck from "./components/PlayDeck";
import { useCurrentUserHook } from "./contexts/useCurrentUserHook";
import LandingPage from "./components/LandingPage";

// COMPONENT STYLE
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
  const { user, setUser } = useCurrentUserHook();

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <Provider store={store}>
          <BrowserRouter>
            <div className={classes.app}>
              <NavBar />
              <div className={classes.container}>
                <Switch>
                  <Route exact path="/" render={() => <LandingPage />} />
                  <Route exact path="/decks" render={() => <AllDecks />} />
                  <Route exact path="/decks/new" render={() => <NewDeck />} />
                  <Route exact path="/decks/:deckId" component={ViewDeck} />
                  <Route
                    exact
                    path="/decks/:deckId/play"
                    component={PlayDeck}
                  />
                  <Route exact path="/users/new" render={() => <NewUser />} />
                  <Route exact path="/login" render={() => <Login />} />
                  <Route exact path="/logout" render={() => <Logout />} />
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
