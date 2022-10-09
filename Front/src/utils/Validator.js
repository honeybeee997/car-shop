export const validateCarForm = (values) => {
  const errors = {};

  if (!values.carModel) {
    errors.carModel = "Please enter a car model";
  } else if (values.carModel.trim().length < 3) {
    errors.carModel = "Car model must be at least 3 characters long";
  }

  if (!values.price) {
    errors.price = "Please enter a price";
  }

  if (!values.phone) {
    errors.phone = "Please enter a Phone number";
  } else if (values.phone.toString().length !== 11) {
    errors.phone = "Phone number must be 11 characters";
  }

  return errors;
};

export const validateSignUp = (values) => {
  const errors = {};
  if (!values.fullName) {
    errors.fullName = "Required";
  } else if (values.fullName.length > 15) {
    errors.fullName = "First Name must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "password must be at least 6 characters";
  }

  return errors;
};

export const validateLogin = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "password must be at least 6 characters";
  }

  return errors;
};
