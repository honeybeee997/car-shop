import React, { useState } from "react";
import { Box, Button, Heading, Radio, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { validateCarForm } from "../../utils/Validator";
import Input from "../form/Input";
import ImageUpload from "../form/ImageUpload";
import { useContext } from "react";
import { StateContext } from "../../store/StateContext";
import { backend } from "../../../.config.js";

const boxStyles = {
  borderWidth: "1px",
  w: "100%",
  p: 8,
  pb: 16,
  color: "black",
  maxW: "3xl",
  overflow: "hidden",
  borderRadius: "5px",
  margin: "0 auto",
  bg: "white",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
};

const HomeForm = () => {
  const { token } = useContext(StateContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [maxImages, setMaxImages] = useState(1);
  const [images, setImages] = useState([]);
  const [city, setCity] = useState({
    value: "",
    error: "",
  });

  const formik = useFormik({
    initialValues: {
      carModel: "",
      price: "",
      phone: "",
    },
    validate: validateCarForm,
    onSubmit: (values) => {
      if (city.value === "") {
        return setCity({ ...city, error: "Please Select a city" });
      }
      if (!images.length || images.length > +maxImages) {
        console.log(maxImages);
        console.log(images);
        toast({
          title: "Failed",
          description: "Please upload the no. of images you selected",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const data = { ...values, city: city.value, images };
      console.log(data.images);
      (async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("model", data.carModel);
        formData.append("price", data.price);
        formData.append("phone", data.phone);
        formData.append("city", data.city);
        for (const image of data.images) {
          formData.append("images", image.file);
        }
        try {
          const response = await fetch(`${backend}/cars/add-new`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          if (response.ok) {
            toast({
              title: "Success.",
              description: "Car Posted Successfully",
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            formik.resetForm();
            setIsLoading(false);
          } else if (response.status === 400) {
            setIsLoading(false);
            toast({
              title: "Unable to post Car",
              description: data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } catch (err) {
          setIsLoading(false);
        }
      })();
    },
  });

  const selectChangeHandler = (e) => {
    setMaxImages(e.target.value);
  };

  const cityChangeHandler = (e) => {
    setCity({ error: "", value: e.target.value });
  };

  const isFormValid = formik.touched.carModel && formik.isValid;

  return (
    <Box {...boxStyles}>
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
          disabled={!isFormValid}
          isLoading={isLoading}
          margin="1rem auto 0"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Add Car
        </Button>
      </form>
    </Box>
  );
};

export default HomeForm;
