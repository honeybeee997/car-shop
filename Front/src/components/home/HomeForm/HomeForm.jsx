import { Box, Button, Heading, Radio, Text } from "@chakra-ui/react";
import React from "react";
import ImageUpload from "../../form/ImageUpload";
import Input from "../../form/Input";

const HomeForm = ({
  formik,
  isLoading,
  city,
  cityChangeHandler,
  selectChangeHandler,
  maxImages,
  setImages,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Heading as="h3" size="lg" textAlign="center" margin="1rem 0">
        Add a new Car
      </Heading>
      <Input
        label="Car Model"
        name="carModel"
        type="text"
        error={formik.touched.carModel && formik.errors.carModel}
        {...formik.getFieldProps("carModel")}
      />
      <Input
        label="Price"
        name="price"
        type="number"
        error={formik.touched.price && formik.errors.price}
        {...formik.getFieldProps("price")}
      />
      <Input
        label="Phone Number"
        name="phone"
        type="number"
        error={formik.touched.phone && formik.errors.phone}
        {...formik.getFieldProps("phone")}
      />
      {/* City and No of Images select */}
      <Box display="flex" alignItems="center" gap="20px">
        <Box flex="1">
          <Input name="City" type="radio">
            <Radio value="Lahore" type="radio" onChange={cityChangeHandler}>
              Lahore
            </Radio>
            <Radio value="karachi" type="radio" onChange={cityChangeHandler}>
              Karachi
            </Radio>
          </Input>
          {city.error && (
            <Text size="sm" color="red">
              {city.error}
            </Text>
          )}
        </Box>
        <Box flex="1">
          <Input
            name="No. of images"
            type="select"
            onChange={selectChangeHandler}
          >
            {/* Creating an array of 11 undefined Items and Printing Options */}
            {new Array(11).fill().map((_, i) => {
              if (i === 0) return;
              return (
                <option value={i} key={i}>
                  {i}
                </option>
              );
            })}
          </Input>
        </Box>
      </Box>
      {/* Image Upload */}
      <Box marginTop="1rem">
        <ImageUpload max={maxImages} allImages={setImages} />
      </Box>
      <Button
        colorScheme="green"
        type="submit"
        width="100%"
        disabled={!formik.isValid}
        isLoading={isLoading}
        margin="1rem auto 0"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Add Car
      </Button>
    </form>
  );
};

export default HomeForm;
