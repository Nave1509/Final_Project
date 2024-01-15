import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useStore } from "../context/store.context";

const SignIn = ({ redirect = "/" }) => {
  const [error, setError] = useState("");

  const { login, user } = useStore();

  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().min(7).max(1024).required(),
    }),

    async onSubmit(values) {
      try {
        await login(values);
        navigate(redirect);
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
      <PageHeader title="Sign In " description="Sign in to your account" />

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

        <div className="my-2 d-flex">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary  ms-auto"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
