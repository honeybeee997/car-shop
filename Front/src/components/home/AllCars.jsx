import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { backend } from "../../../.config";
import { useFetch } from "../../hooks/useFetch";
import { useStateContext } from "../../hooks/useStateContext";
import CarsList from "../user/CarsList";

const AllCars = ({ AllCarsIsOpen, AllCarsOnClose }) => {
  const { token } = useStateContext();
  const [sendRequest, isLoading] = useFetch();
  const [cars, setCars] = useState();
  useEffect(() => {
    (async function () {
      const headers = {
        Authorization: "Bearer " + token,
      };
      const data = await sendRequest(`${backend}/cars/`, "GET", null, headers);
      setCars(data.user.cars);
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
            <CarsList data={cars} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AllCars;
