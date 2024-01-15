const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    phone: {
      type: String,
      default: "",
      minlength: 0,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    image: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        minlength: 11,
        maxlength: 1024,
      },
      alt: {
        type: String,
        minlength: 6,
        maxlength: 255,
        default: "User Image",
      },
      _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        amount: {
          type: Number,
          min: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    },
    config.get("auth.JWT_SECRET")
  );
};

const User = mongoose.model("User", userSchema, "users");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    phone: Joi.string()
      .min(0)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/)
      .allow(null, ""),
    email: Joi.string().min(6).max(255).required().email({ tlds: false }),
    password: Joi.string().min(6).max(1024).required(),
    image: Joi.object({
      url: Joi.string().min(11).max(1024),
      alt: Joi.string().min(6).max(255),
    }),
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };
