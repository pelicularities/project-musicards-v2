// REACT AND FRIENDS
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";

function Logout() {
  const [user, setUser] = useContext(UserContext);
  const [redirectToMain, setRedirectToMain] = useState(false);

  useEffect(() => {
    const requestUrl =
      "https://express-musicards-test.herokuapp.com/users/logout";
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };
    fetch(requestUrl, requestOptions).then((response) => {
      if (response.status === 200) {
        setUser(null);
        setRedirectToMain(true);
      }
    });
  }, []);

  return <div>{redirectToMain && <Redirect to="/" />}</div>;
}

export default Logout;
