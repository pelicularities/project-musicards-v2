import { useState, useEffect } from "react";
import { REACT_APP_API_URL } from "../constants/api";

export const useCurrentUserHook = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const requestUrl = `${REACT_APP_API_URL}/users/me`;

    const requestOptions = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(requestUrl, requestOptions).then((response) => {
      console.log(response.body);
      if (response.status === 200) {
        setUser(response.body.user);
      }
    });
  }, []);

  return {
    user,
    setUser,
  };
};
