import { useState, useEffect } from "react";

export const useCurrentUserHook = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const requestUrl = `${process.env.REACT_APP_API_URL}/users/me`;

    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(requestUrl, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("You are not logged in.");
        }
      })
      .then((user) => setUser(user))
      .catch(console.error);
  }, []);

  return { user, setUser };
};
