// REACT AND FRIENDS
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

// INTERNAL IMPORTS
import UserContext from "../contexts/UserContext";
// import { REACT_APP_API_URL } from "../constants/api";

function Logout() {
  const [, setUser] = useContext(UserContext);
  const [redirectToMain, setRedirectToMain] = useState(false);

  useEffect(() => {
    const requestUrl = `${process.env.REACT_APP_API_URL}/users/logout`;
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
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
