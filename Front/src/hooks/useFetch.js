import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export const useFetch = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "content-type": "application/json" }
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();
        if (response.ok && method !== "GET") {
          toast({
            title: "Success.",
            description: responseData.message,
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        } else if (!response.ok && method !== "GET") {
          toast({
            title: "Failure.",
            description: responseData.message,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        toast({
          title: "Failure.",
          description: "Something went wrong",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  );

  return [sendRequest, isLoading];
};
