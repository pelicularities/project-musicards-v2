// REACT AND FRIENDS
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

// THEMING
import "./styles/App.css";
import theme from "./styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";

// EXTERNAL COMPONENTS

// INTERNAL COMPONENTS
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <NavBar user={user} />
          <Route exact path="/" render={() => "main page"} />
          <Route
            exact
            path="/login"
            render={() => <Login updateUser={updateUser} />}
          />
          <Route
            exact
            path="/logout"
            render={() => <Logout updateUser={updateUser} />}
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
