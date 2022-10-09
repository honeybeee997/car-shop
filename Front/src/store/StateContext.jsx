import React, { useCallback, useEffect, useState } from "react";

export const StateContext = React.createContext({
  token: "",
  isLoggedIn: false,
  username: "",
  login: () => {},
  logout: () => {},
});

export const StateProvider = (props) => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const loginHandler = useCallback((token, username) => {
    setToken(token);
    setUsername(username);
    setIsLoggedIn(true);

    setTimeout(() => {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
    }, 500);
  }, []);

  const logouthandler = useCallback(() => {
    setToken("");
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("username")
    ) {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      loginHandler(token, username);
    }
  }, [loginHandler]);

  const stateValue = {
    token,
    isLoggedIn,
    username,
    login: loginHandler,
    logout: logouthandler,
  };

  return (
    <StateContext.Provider value={stateValue}>
      {props.children}
    </StateContext.Provider>
  );
};
