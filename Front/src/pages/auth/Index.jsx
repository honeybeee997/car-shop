import React, { Suspense, useState } from "react";
import { Box } from "@chakra-ui/react";
import Loader from "../../utils/Loader";
import Login from "./Login/Index";
const SignUp = React.lazy(() => import("./SignUp/Index"));
import styles from "./Auth.module.css";

const Auth = () => {
  const [login, setLogin] = useState(true);

  const modeSwitchHandler = () => {
    setLogin((prevState) => !prevState);
  };

  return (
    <>
      <Box bg="white" className={styles.card} p="3rem">
        {login === true ? (
          <Login />
        ) : (
          <Suspense fallback={<Loader />}>
            <SignUp />
          </Suspense>
        )}
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
    </>
  );
};

export default Auth;
