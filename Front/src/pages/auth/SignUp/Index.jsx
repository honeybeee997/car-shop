import React, { useState } from "react";
import { Button, Heading, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import Input from "../../../components/form/Input";
import styles from "../Auth.module.css";
import { validateSignUp } from "../../../utils/Validator";
import { useContext } from "react";
import { StateContext } from "../../../store/StateContext";
import { backend } from "../../../../.config";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(StateContext);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validate: validateSignUp,
    onSubmit: (values) => {
      (async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${backend}/auth/sign-up`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          });
          const data = await response.json();
          if (response.ok) {
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            setIsLoading(false);
            login(data.token, data.user.name);
          } else if (response.status === 400) {
            setIsLoading(false);
            toast({
              title: "Unable to create account",
              description: data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (err) {
          setIsLoading(false);
          toast({
            title: "Unable to create account",
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
        Sign Up
      </Heading>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          {...formik.getFieldProps("fullName")}
          error={formik.touched.fullName && formik.errors.fullName}
        />
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
          isLoading={isLoading}
          margin="0 auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
