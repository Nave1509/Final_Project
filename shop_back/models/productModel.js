const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  image: {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg",
      minlength: 0,
      maxlength: 1024,
    },
    alt: {
      type: String,
      minlength: 0,
      maxlength: 255,
      default: "Product Image",
    },
  },
});

const Product = mongoose.model("Product", productSchema, "products");

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(2).max(1024).required(),
    image: Joi.object({
      url: Joi.string().min(11).max(1024).allow(null, ""),
      alt: Joi.string().min(6).max(255).allow(null, ""),
    }),
  });

  return schema.validate(product);
}

module.exports = { Product, validateProduct };
