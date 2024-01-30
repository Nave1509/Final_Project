import { useFormik } from "formik";
import Joi from "joi";
import { toast } from "react-toastify";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import Input from "../common/input";
import { useStore } from "../../context/store.context";

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
        toast.success("you Registered / Logged in Successfully", {
          position: "top-center",
          closeButton: true,
          autoClose: 2000,
          hideProgressBar: false,
          toastId: "signedInToast",
        });
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
      <form
        className="col-9 col-sm-6 signInForm"
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

        <div className="my-2 d-flex justify-content-center">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
