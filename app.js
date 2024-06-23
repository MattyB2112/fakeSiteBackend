const cors = require("cors");
const express = require("express");
const {
  getProducts,
  getProductById,
} = require("./controllers/products.controllers.js");
const { getUserById } = require("./controllers/users.controllers.js");
const app = express();
const apiRouter = require("./api-router.js");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/products", getProducts);

app.get("/api/products/:product_id", getProductById);

app.get("/api/users/:user_id", getUserById);

app.all("*", (req, res) => {
  res.status(404).send({ message: "endpoint not found!" });
});

module.exports = app;
