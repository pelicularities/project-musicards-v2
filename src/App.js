// REACT AND FRIENDS
import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// THEMING
import "./styles/App.css";
import theme from "./styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";

// EXTERNAL COMPONENTS

// INTERNAL COMPONENTS
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewUser from "./components/NewUser";

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
          <Route exact path="/users/new" render={() => <NewUser />} />
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
