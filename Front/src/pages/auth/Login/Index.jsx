import React, { useContext, useState } from "react";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { validateLogin } from "../../../utils/Validator";

import Input from "../../../components/form/Input";
import styles from "../Auth.module.css";
import { StateContext } from "../../../store/StateContext";
import { backend } from "../../../../.config";

const Login = () => {
  const { login } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLogin,
    onSubmit: (values) => {
      (async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${backend}/auth/login`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          });
          const data = await response.json();
          if (response.ok) {
            toast({
              title: "Login successfull.",
              description: "You've been Logged In",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            setIsLoading(false);
            login(data.token, data.user.name);
          } else if (response.status === 400) {
            setIsLoading(false);
            toast({
              title: "Unable to Login",
              description: data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (err) {
          setIsLoading(false);
          toast({
            title: "Unable to Login",
            description: "Please try again later",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        }
      })();
    },
  });

  return (
    <div className={`w-full ${styles.wrapper}`}>
      <Heading as="h2" size="xl">
        Login
      </Heading>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <Input
          label="Email"
          name="email"
          type="email"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          {...formik.getFieldProps("password")}
          error={formik.touched.password && formik.errors.password}
        />
        <Button
          colorScheme="green"
          type="submit"
          disabled={!formik.isValid}
          margin="0 auto"
          isLoading={isLoading}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
