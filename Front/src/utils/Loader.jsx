import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="white.500"
      size="xl"
      position="absolute"
      top="50%"
      left="50%"
      translate="-50%, -50%"
    />
  );
};

export default Loader;
