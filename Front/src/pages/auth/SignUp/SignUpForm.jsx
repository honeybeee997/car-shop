import { Button } from "@chakra-ui/react";
import React from "react";
import Input from "../../../components/form/Input";

const SignUpForm = ({ formik, isLoading }) => {
  return (
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
  );
};

export default SignUpForm;
