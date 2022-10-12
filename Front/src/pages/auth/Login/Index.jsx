import { validateLogin } from "../../../utils/Validator";
import { useFetch } from "../../../hooks/useFetch";
import { backend } from "../../../../.config";
import { Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useStateContext } from "../../../hooks/useStateContext";

import LoginForm from "./LoginForm";
import styles from "../Auth.module.css";

const Login = () => {
  const { login } = useStateContext();
  const [sendRequest, isLoading] = useFetch();

  // initial form values
  const formInitialValue = {
    email: "",
    password: "",
  };

  // form submit handler
  const formikSubmitHandler = async (values) => {
    const body = JSON.stringify(values);
    const data = await sendRequest(`${backend}/auth/login`, "POST", body);
    if (data.token) login(data.token, data.user.name);
  };

  const formik = useFormik({
    initialValues: formInitialValue,
    validate: validateLogin,
    onSubmit: formikSubmitHandler,
  });

  return (
    <div className={`w-full ${styles.wrapper}`}>
      <Heading as="h2" size="xl">
        Login
      </Heading>
      <LoginForm formik={formik} isLoading={isLoading} />
    </div>
  );
};

export default Login;
