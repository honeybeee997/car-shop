import { useContext } from "react";
import { StateContext } from "../store/StateContext";

export const useStateContext = () => {
  const { isLoggedIn, token, username, login, logout } =
    useContext(StateContext);

  return { isLoggedIn, token, username, login, logout };
};
