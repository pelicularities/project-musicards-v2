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

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar user={user} updateUser={updateUser} />
        <BrowserRouter>
          <Route
            exact
            path="/login"
            render={() => <Login updateUser={updateUser} />}
          />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
