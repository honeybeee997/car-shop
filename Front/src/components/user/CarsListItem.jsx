import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { backend } from "../../../.config";

const boxStyles = {
  borderWidth: "1px",
  borderRadius: "5px",
  pr: "10px",
  marginBottom: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const CarsListItem = ({
  model,
  phone,
  price,
  date,
  city,
  image,
  id,
  filterCars,
}) => {
  const removeCarHandler = () => {
    filterCars(id);
  };

  return (
    <li>
      <Box {...boxStyles}>
        <Box flex="1" className="allCars_imageInfo">
          <div className="allCars_image">
            <img src={`${backend}/${image}`} alt={model} />
          </div>
          <div className="allCars_info">
            <Heading as="h5" size="sm">
              {model}
            </Heading>
            <Text fontSize="md" margin="10px 0">
              $ {price}
            </Text>
            <Box display="flex">
              <Text fontSize="xs" flex="1">
                Phone Number
                <br />
                {phone}
              </Text>
              <Text fontSize="xs" flex="1">
                City
                <br />
                {city}
              </Text>
              <Text fontSize="xs" flex="1">
                Date created
                <br />
                {date}
              </Text>
            </Box>
          </div>
        </Box>
        <Button type="button" colorScheme="red" onClick={removeCarHandler}>
          <FaTrashAlt />
        </Button>
      </Box>
    </li>
  );
};

export default CarsListItem;
