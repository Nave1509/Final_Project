const productsRouter = require("express").Router();
const authMW = require("../middleware/authMW");
const { Product, validateProduct } = require("../models/productModel");

// Get all
productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

//Filter
productsRouter.get("/filter/:filter", async (req, res) => {
  try {
    let filteredProducts;

    if (req.params.filter !== "!@#p") {
      filteredProducts = await Product.find({
        category: { $regex: `${req.params.filter}`, $options: "i" },
      });
    } else {
      filteredProducts = await Product.find();
    }

    res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// search
productsRouter.get("/search/:search", async (req, res) => {
  try {
    let products;
    if (req.params.search !== "!@#פ") {
      products = await Product.find({
        title: { $regex: `${req.params.search}`, $options: "i" },
      });
    } else {
      products = await Product.find();
    }

    res.send(products);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

// Get Product By ID
productsRouter.get("/:id", async (req, res) => {
  try {
    const products = await Product.findOne({ _id: req.params.id });
    res.send(products);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

//Create Product
productsRouter.post("/", authMW("isAdmin"), async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(401).send(error.details[0].message);
    return;
  }
  let product = new Product(req.body);
  try {
    await product.save();
    res.send(product);
  } catch (err) {
    console.log("create error");
    res.status(401).send(err.message);
  }
});

//Edit Product
productsRouter.put("/:id", authMW("isAdmin"), async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(401).send(error.details[0].message);
    return;
  }

  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.send(product);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

//Delete Product
productsRouter.delete("/:id", authMW("isAdmin"), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    res.send(product);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = productsRouter;
