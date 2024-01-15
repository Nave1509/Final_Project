const jwt = require("jsonwebtoken");
const config = require("config");
const { Product } = require("../models/productModel");

function authMW(...roles) {
  //roles: "isAdmin","userOwner","cardOwner"
  return async (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
      res.statusMessage = "Access Denied. No token provided";
      res.status(401).send("Access Denied. No token provided");
      return;
    }

    try {
      const decode = jwt.verify(token, config.get("auth.JWT_SECRET"));
      req.user = decode;
      if (!roles || roles.length == 0) {
        next();
      } else if (roles.includes("isAdmin") && req.user.isAdmin) {
        next();
      } else {
        res.statusMessage =
          "Access Denied. User does not have the proper authorization.";
        res
          .status(400)
          .send("Access Denied. User does not have the proper authorization.");
        return;
      }
    } catch (err) {
      res.statusMessage = "Invalid Token";
      res.status(400).send("Invalid Token");
      return;
    }
  };
}

module.exports = authMW;
