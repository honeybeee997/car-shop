import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import Drawer from "../../components/home/HomeDrawer";
import HomeForm from "../../components/home/HomeForm/Index";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HomeForm />
      <Drawer DrawerOnClose={onClose} DrawerOpen={isOpen} />
      <Button
        bg="transparent"
        fontSize="2rem"
        color="white"
        onClick={onOpen}
        className="user-action-trigger"
      >
        <BiUser />
      </Button>
    </>
  );
};

export default Home;
