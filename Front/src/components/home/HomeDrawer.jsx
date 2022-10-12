import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Suspense, useContext } from "react";
import { BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { IoCarSportSharp } from "react-icons/io5";
import { StateContext } from "../../store/StateContext";
import AllCars from "./AllCars";
import Loader from "../../utils/Loader";
import Logout from "./Logout";

const drawerStyles = {
  borderBottomWidth: "1px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  bg: "transparent",
  width: "100%",
  borderRadius: "0",
};

const HomeDrawer = ({ DrawerOnClose, DrawerOpen }) => {
  const { username } = useContext(StateContext);

  // Logout Alert box States
  const {
    isOpen: LogoutIsOpen,
    onOpen: LogoutOnOpen,
    onClose: LogoutOnClose,
  } = useDisclosure();

  // All Cars Modal States
  const {
    isOpen: AllCarsIsOpen,
    onOpen: AllCarsOnOpen,
    onClose: AllCarsOnClose,
  } = useDisclosure();

  const triggerHandler = (e) => {
    // Getting which menu item was clicked on
    const action = e.target.dataset.action;
    DrawerOnClose();
    // Modal and alerts throws error with drawer. Solution ?
    // 1) Close the Drawer first
    setTimeout(() => {
      action === "1" ? AllCarsOnOpen() : LogoutOnOpen();
    }, 200);
  };

  return (
    <>
      <Drawer placement="right" onClose={DrawerOnClose} isOpen={DrawerOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader {...drawerStyles}>
            <BiUser /> Heyy {username.split(" ")[0]} !
          </DrawerHeader>
          <DrawerBody p="0">
            <Button
              {...drawerStyles}
              justifyContent="flex-start"
              py="1.8rem"
              onClick={triggerHandler}
              data-action="1"
            >
              <IoCarSportSharp /> See All Cars
            </Button>
            <Button
              {...drawerStyles}
              justifyContent="flex-start"
              py="1.8rem"
              onClick={triggerHandler}
              data-action="2"
            >
              <FiLogOut /> Logout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Suspense fallback={<Loader />}>
        <AllCars
          AllCarsIsOpen={AllCarsIsOpen}
          AllCarsOnClose={AllCarsOnClose}
          onCL
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Logout LogoutIsOpen={LogoutIsOpen} LogoutClose={LogoutOnClose} />
      </Suspense>
    </>
  );
};

export default HomeDrawer;
