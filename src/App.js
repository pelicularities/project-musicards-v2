// REACT AND FRIENDS
import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// THEMING
import "./styles/App.css";
import theme from "./styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";

// EXTERNAL COMPONENTS

// INTERNAL COMPONENTS
import UserContext from "./contexts/UserContext";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewUser from "./components/NewUser";

function App() {
  const user = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Route exact path="/" render={() => "main page"} />
            <Route exact path="/users/new" render={() => <NewUser />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/logout" render={() => <Logout />} />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
