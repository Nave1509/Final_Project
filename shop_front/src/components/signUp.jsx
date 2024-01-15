import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../context/store.context";

const SignUp = () => {
  const navigate = useNavigate();

  const { user, createUser, login } = useStore();

  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/;

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } })
        .label("Email"),
      password: Joi.string()
        .min(6)
        .max(1024)
        .required()
        .regex(passwordRegex)
        .messages({
          "string.pattern.base": `The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).`,
        })
        .label("Password"),
      name: Joi.string().min(2).max(255).required().label("Name"),
    }),

    async onSubmit(values) {
      try {
        await createUser(values);
        await login({ email: values.email, password: values.password });
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader title="Sign Up " description="open a new account" />

      <form
        className="col-12 col-sm-6"
        onSubmit={form.handleSubmit}
        noValidate
        style={{ margin: "auto" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          error={form.touched.password && form.errors.password}
        />
        <Input
          {...form.getFieldProps("name")}
          type="text"
          label="Name"
          required
          error={form.touched.name && form.errors.name}
        />

        <div className="my-2 d-flex">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary ms-auto"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};
export default SignUp;
