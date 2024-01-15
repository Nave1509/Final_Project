import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useStore } from "../context/store.context";
import { toast } from "react-toastify";

const ProductsCreate = () => {
  const [error, setError] = useState("");
  const { createProduct } = useStore();

  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      category: "",
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      imageAlt: "",
    },
    validate: formikValidateUsingJoi({
      category: Joi.string().min(2).max(255).required().label("category"),
      title: Joi.string().min(2).max(255).required().label("title"),
      description: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("description"),

      price: Joi.number().min(0).required().label("price"),
      imageUrl: Joi.string().min(11).max(1024).allow("").label("Image url"),
      imageAlt: Joi.string().min(6).max(255).allow("").label("Image alt"),
    }),

    async onSubmit(values) {
      try {
        let newProduct = {
          "category": values.category,
          "title": values.title,
          "description": values.description,
          "price": values.price,
          "image": {
            "url": values.imageUrl || "",
            "alt": values.imageAlt || "",
          },
        };
        await createProduct(newProduct);
        toast("Product Create Successfully 👏👏");
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader
        title="Create Product"
        description="Start creating a product quickly and easily"
      />
      <p className="fs-5 textInfo text-center">Enter information here</p>

      <form
        className="col-12 col-sm-6 mx-auto"
        onSubmit={form.handleSubmit}
        noValidate
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          {...form.getFieldProps("category")}
          type="text"
          label="category"
          required
          error={form.touched.category && form.errors.category}
        />
        <Input
          {...form.getFieldProps("title")}
          type="text"
          label="title"
          required
          error={form.touched.title && form.errors.title}
        />
        <Input
          {...form.getFieldProps("description")}
          type="text"
          label="description"
          required
          error={form.touched.description && form.errors.description}
        />

        <Input
          {...form.getFieldProps("price")}
          type="text"
          label="price"
          required
          error={form.touched.price && form.errors.price}
        />

        <Input
          {...form.getFieldProps("imageUrl")}
          type="text"
          label="imageUrl"
          error={form.touched.imageUrl && form.errors.imageUrl}
        />
        <Input
          {...form.getFieldProps("imageAlt")}
          type="text"
          label="imageAlt"
          error={form.touched.imageAlt && form.errors.imageAlt}
        />

        <div className="my-2 d-flex">
          <Link to={`/`} className="card-link btn btn-primary pb-1">
            <i className="bi bi-arrow-left-circle"></i>
          </Link>
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary ms-auto"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};
export default ProductsCreate;
