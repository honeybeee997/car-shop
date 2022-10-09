import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { backend } from "../../../.config";
import { StateContext } from "../../store/StateContext";
import CarsList from "../user/CarsList";

const AllCars = ({ AllCarsIsOpen, AllCarsOnClose }) => {
  const { token } = useContext(StateContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const response = await fetch(`${backend}/cars/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      console.log(data);
      setData(data.user.cars);
      setIsLoading(false);
    })();
  }, [AllCarsIsOpen]);

  return (
    <Modal
      isOpen={AllCarsIsOpen}
      onClose={AllCarsOnClose}
      isCentered
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent pb="1rem">
        <ModalHeader
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <span>Your Cars</span>
        </ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="green.500"
              size="xl"
            />
          ) : (
            <CarsList data={data} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AllCars;
