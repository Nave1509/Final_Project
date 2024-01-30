import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import Input from "../common/input";
import PageHeader from "../common/pageHeader";
import { useStore } from "../../context/store.context";
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
      productAccordingTo: "",
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
      productAccordingTo: Joi.string()
        .required()
        .valid("KG", "Units")
        .min(2)
        .max(255)
        .label("product according to"),
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
          "productAccordingTo": values.productAccordingTo,
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
        description="Enter information here"
      ></PageHeader>

      <form
        className="col-9 col-sm-6 mx-auto"
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
          {...form.getFieldProps("productAccordingTo")}
          type="text"
          label="product according to (KG / Units)"
          required
          error={
            form.touched.productAccordingTo && form.errors.productAccordingTo
          }
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

        <div className="my-2 d-flex justify-content-center">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary my-2"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};
export default ProductsCreate;
