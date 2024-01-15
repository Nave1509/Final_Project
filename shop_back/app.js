require("dotenv/config");
const config = require("config");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const chalk = require("chalk");
const cors = require("cors");
const cartRouter = require("./routes/cartRouter");

mongoose
  .connect(config.get("mongoDB.MONGO_URI"))
  .then(() => console.log(chalk.green.bold("Connected to MongoDB")))
  .catch((err) =>
    console.log(chalk.red.bold("Could not connect to MongoDB"), err)
  );

const app = express();

app.use(
  morgan(
    chalk.yellow(
      `DATE: :date[web] ; METHOD: :method ; URL: :url ; STATUS: :status ; RESPONSE TIME: :response-time ms`
    )
  )
);

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

app.use(express.static("public"));

app.all("*", (req, res) => {
  res.status(404).send("404 Page Not Found.");
});

app.listen(config.get("server.PORT"), () =>
  console.log(
    chalk.white.bgGreen(`Listening to port ${config.get("server.PORT")}`)
  )
);
