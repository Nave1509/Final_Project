import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { formikValidateUsingJoi } from "../utils/formikValidateUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useProducts } from "../hooks/useProduct";
import { toast } from "react-toastify";

import { useStore } from "../context/store.context";

const ProductsEdit = () => {
  const [error, setError] = useState("");
  const { editProduct } = useStore();

  const navigate = useNavigate();
  const { id } = useParams();
  const product = useProducts(id);

  // const form = useFormik({
  //   validateOnMount: true,
  //   initialValues: {
  //     category: "",
  //     title: "",
  //     description: "",
  //     price: "",
  //     image: "",
  //   },

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

    // validate: formikValidateUsingJoi({
    //   category: Joi.string().min(2).max(400).required().label("category"),
    //   title: Joi.string().min(2).max(255).required().label("title"),
    //   description: Joi.string()
    //     .min(2)
    //     .max(1024)
    //     .required()
    //     .label("Description"),
    //   price: Joi.number().min(0).max(1024).required().label("price"),
    //   image: Joi.string().min(11).max(1024).allow("").label("Image"),
    // }),

    validate: formikValidateUsingJoi({
      category: Joi.string().min(2).max(400).required().label("category"),
      title: Joi.string().min(2).max(255).required().label("title"),
      description: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      price: Joi.number().min(0).max(1024).required().label("price"),
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

    // async onSubmit(values) {
    //   try {
    //     await editProduct(id, {
    //       ...values,
    //       "image": { "url": values.image || "", "alt": values.title || "" },
    //     });
    //     toast("Product Updated Successfully 👏👏");
    //     navigate("/");
    //   } catch ({ response }) {
    //     if (response && response.status === 400) {
    //       setError(response.data);
    //     }
    //   }
    // },
  });

  useEffect(() => {
    if (!product) return;
    const { category, title, description, price } = product;
    const imageUrl = product.image.url;
    const imageAlt = product.image.alt;

    form.setValues({ category, title, description, price, imageUrl, imageAlt });
  }, [product]);

  // useEffect(() => {
  //   if (!product) return;
  //   const { title, description, category, price } = product;
  //   const imageUrl = product.image.url;
  //   const imageAlt = product.image.alt;

  //   form.setValues({
  //     title,
  //     description,
  //     category,
  //     price,
  //     imageUrl,
  //     imageAlt,
  //   });
  // }, [product]);

  return (
    <>
      <PageHeader
        title={product?.title}
        description="Start editing a product quickly and easily"
      />
      <p className=" fs-5 textInfo text-center">Enter information here</p>

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
        {/* <Input
          {...form.getFieldProps("image")}
          type="text"
          label="Image"
          error={form.touched.image && form.errors.image}
        /> */}

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

        <div className="my-2 d-flex">
          <Link to={`/`} className="card-link btn btn-primary pb-1">
            <i className="bi bi-arrow-left-circle"></i>
          </Link>

          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary ms-auto"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};
export default ProductsEdit;
