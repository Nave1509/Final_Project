import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formikValidateUsingJoi } from "../../utils/formikValidateUsingJoi";
import Input from "../common/input";
import PageHeader from "../common/pageHeader";
import { useProducts } from "../../hooks/useProduct";
import { toast } from "react-toastify";

import { useStore } from "../../context/store.context";

const ProductsEdit = () => {
  const [error, setError] = useState("");
  const { editProduct } = useStore();

  const navigate = useNavigate();
  const { id } = useParams();
  const product = useProducts(id);

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
      category: Joi.string().min(2).max(400).required().label("category"),
      title: Joi.string().min(2).max(255).required().label("title"),
      description: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      price: Joi.number().min(0).max(1024).required().label("price"),
      productAccordingTo: Joi.string()
        .min(2)
        .max(255)
        .label("product according to"),
      imageUrl: Joi.string().min(11).max(1024).allow("").label("Image Url"),
      imageAlt: Joi.string().min(6).max(255).allow("").label("Image alt"),
    }),

    async onSubmit(values) {
      try {
        await editProduct(id, {
          "title": values.title,
          "category": values.category,
          "description": values.description,
          "price": values.price,
          "productAccordingTo": values.productAccordingTo,
          "image": { "alt": values.imageAlt, "url": values.imageUrl },
        });
        toast("Product Updated Successfully 👏👏");
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!product) return;
    const { category, title, description, price, productAccordingTo } = product;
    const imageUrl = product.image.url;
    const imageAlt = product.image.alt;

    form.setValues({
      category,
      title,
      description,
      price,
      productAccordingTo,
      imageUrl,
      imageAlt,
    });
  }, [product]);

  return (
    <>
      <PageHeader
        title="Edit Product"
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
          label="Description"
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
          label="Image Url"
          error={form.touched.imageUrl && form.errors.imageUrl}
        />
        <Input
          {...form.getFieldProps("imageAlt")}
          type="text"
          label="Image Alt"
          error={form.touched.imageAlt && form.errors.imageAlt}
        />

        <div className="my-2 d-flex justify-content-center">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};
export default ProductsEdit;
