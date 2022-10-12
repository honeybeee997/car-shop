import { Heading } from "@chakra-ui/react";
import { useFormik } from "formik";
import { validateSignUp } from "../../../utils/Validator";
import { backend } from "../../../../.config";
import { useFetch } from "../../../hooks/useFetch";
import { useStateContext } from "../../../hooks/useStateContext";
import SignUpForm from "./SignUpForm";
import styles from "../Auth.module.css";

const SignUp = () => {
  const [sendRequest, isLoading] = useFetch();
  const { login } = useStateContext();

  // initial form values
  const formikInitial = {
    fullName: "",
    email: "",
    password: "",
  };

  // form submit handler
  const formikSubmitHandler = async (values) => {
    const body = JSON.stringify(values);
    const data = await sendRequest(`${backend}/auth/sign-up`, "POST", body);
    if (data.token) login(data.token, data.user.name);
  };

  const formik = useFormik({
    initialValues: formikInitial,
    validate: validateSignUp,
    onSubmit: formikSubmitHandler,
  });

  return (
    <div className={`w-full ${styles.wrapper}`}>
      <Heading as="h2" size="xl">
        Sign Up
      </Heading>
      <SignUpForm formik={formik} isLoading={isLoading} />
    </div>
  );
};

export default SignUp;
