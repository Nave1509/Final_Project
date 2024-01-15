const cartRouter = require("express").Router();
const { json } = require("express");
const authMW = require("../middleware/authMW");
const { User } = require("../models/usersModel");

// Get all products cart
cartRouter.get("/", authMW(), async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id })
      .populate("cart.product")
      .select("cart");
    res.send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

// Edit Cart
cartRouter.patch("/updateCart", authMW(), async (req, res) => {
  try {
    const user = await User.find({
      _id: req.user._id,
      "cart.product": req.body._id,
    });
    if (Object.keys(user).length === 0) {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          "$push": {
            cart: { product: req.body._id, amount: req.body.amount },
          },
        },
        { new: true }
      );
    } else {
      if (Number(req.body.amount) === 0) {
        console.log("delete");
        //delete product from cart
        await User.findOneAndUpdate(
          { "_id": req.user._id },
          { $pull: { cart: { product: req.body._id } } },
          { new: true }
        );
      } else {
        await User.findOneAndUpdate(
          { _id: req.user._id, "cart.product": req.body._id },
          { $set: { "cart.$.amount": req.body.amount } },
          { new: true }
        );
      }
    }
    res.send(req.body);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = cartRouter;
