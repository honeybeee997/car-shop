import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import { validateCarForm } from "../../../utils/Validator";
import { backend } from "../../../../.config.js";
import { useFetch } from "../../../hooks/useFetch";
import { useStateContext } from "../../../hooks/useStateContext";
import HomeForm from "./HomeForm";

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

const Index = () => {
  const [sendRequest, isLoading] = useFetch();
  const { token } = useStateContext();
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
    onSubmit: async (values) => {
      // Checking if city selected
      if (city.value === "") {
        return setCity({ ...city, error: "Please Select a city" });
      }

      // Checking images upload
      if (!images.length || images.length > +maxImages) {
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
      // Sending form
      const formData = new FormData();
      formData.append("model", data.carModel);
      formData.append("price", data.price);
      formData.append("phone", data.phone);
      formData.append("city", data.city);
      for (const image of data.images) {
        formData.append("images", image.file);
      }

      const headers = {
        Authorization: "Bearer " + token,
      };

      await sendRequest(`${backend}/cars/add-new`, "POST", formData, headers);
      formik.resetForm();
    },
  });

  const selectChangeHandler = (e) => {
    setMaxImages(e.target.value);
  };

  const cityChangeHandler = (e) => {
    setCity({ error: "", value: e.target.value });
  };

  return (
    <Box {...boxStyles}>
      <HomeForm
        formik={formik}
        isLoading={isLoading}
        city={city}
        cityChangeHandler={cityChangeHandler}
        selectChangeHandler={selectChangeHandler}
        maxImages={maxImages}
        setImages={setImages}
      />
    </Box>
  );
};

export default Index;
