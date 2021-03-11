// REACT AND FRIENDS
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Logout({ updateUser }) {
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
        updateUser(null);
        setRedirectToMain(true);
      }
    });
  }, []);

  return <div>{redirectToMain && <Redirect to="/" />}</div>;
}

export default Logout;
