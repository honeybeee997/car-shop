import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { StateContext } from "../../store/StateContext";

const Logout = ({ LogoutIsOpen, LogoutClose }) => {
  const { logout } = useContext(StateContext);

  const cancelRef = React.useRef();

  const logoutHandler = () => {
    LogoutClose();
    logout();
  };

  return (
    <>
      <AlertDialog
        isOpen={LogoutIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={LogoutClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You want to logout.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={LogoutClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={logoutHandler} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Logout;
