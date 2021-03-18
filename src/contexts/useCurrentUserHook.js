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
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((err) => console.error);
  }, []);

  return { user, setUser };
};
