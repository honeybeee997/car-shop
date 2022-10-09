import { Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import CarsListItem from "./CarsListItem";

const CarsList = ({ data }) => {
  const [cars, setCars] = useState(data);

  console.log(cars);

  const filterCars = (id) => {
    const remaining = cars.filter((car) => {
      return car._id !== id;
    });

    setCars(remaining);
  };

  if (!data || data.length === 0) {
    return <Heading textAlign="center">No Cars found. Create One ?</Heading>;
  }

  return (
    <ul className="items-list">
      {cars?.map((car, i) => {
        return (
          <CarsListItem
            key={i}
            model={car.model}
            price={car.price}
            phone={car.phone}
            date={new Date(car.createdAt).toDateString()}
            city={car.city}
            image={car.images[0]}
            id={car._id}
            filterCars={filterCars}
          />
        );
      })}
    </ul>
  );
};

export default CarsList;
