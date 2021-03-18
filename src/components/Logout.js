// REACT AND FRIENDS
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

// INTERNAL IMPORTS
// import { REACT_APP_API_URL } from "../constants/api";

function Logout({ setUser }) {
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
