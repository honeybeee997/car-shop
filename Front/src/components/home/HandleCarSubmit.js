export const HandlerCarSubmit = (data) => {
  (async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/sign-up", {
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
};
