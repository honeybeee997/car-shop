import React from "react";
import { useState } from "react";
import Login from "./Login/Index";
import SignUp from "./SignUp/Index";
import styles from "./Auth.module.css";
import { Box } from "@chakra-ui/react";

const Auth = () => {
  const [login, setLogin] = useState(true);

  const modeSwitchHandler = () => {
    setLogin((prevState) => !prevState);
  };

  return (
    <main className="screen-center">
      <Box bg="white" className={styles.card} p="3rem">
        {login === true ? <Login /> : <SignUp />}
        <div className="text-center mode-switcher">
          <span>
            {login === true
              ? "First time Here ? "
              : "Already Have an account ? "}
          </span>
          <button
            type="button"
            className="underline"
            onClick={modeSwitchHandler}
          >
            {login === true ? "Create an account" : "Login Here"}
          </button>
        </div>
      </Box>
    </main>
  );
};

export default Auth;
