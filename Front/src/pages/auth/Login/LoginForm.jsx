import React from "react";
import { Button } from "@chakra-ui/react";
import Input from "../../../components/form/Input";

const LoginForm = ({ formik, isLoading }) => {
  return (
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
  );
};

export default LoginForm;
