import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as InputField,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const Input = ({ label, name, type, ...props }) => {
  if (type === "select") {
    return (
      <>
        <FormLabel>{name}</FormLabel>
        <Select onChange={props.onChange}>{props.children}</Select>
      </>
    );
  }

  if (type === "radio") {
    return (
      <>
        <FormLabel>{name}</FormLabel>
        <RadioGroup margin="1rem 0">
          <Stack direction="row" gap="1rem" onChange={e => e.target}>
            {props.children}
          </Stack>
        </RadioGroup>
      </>
    );
  }

  return (
    <FormControl marginBottom="1rem" isInvalid={props.error}>
      <FormLabel>{label}</FormLabel>
      <InputField type={type} name={name} {...props} />
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
