const cors = require("cors");
const express = require("express");
const {
  getProducts,
  getProductById,
} = require("./controllers/products.controllers.js");
const {
  getUserById,
  getUsers,
  createUser,
  getUserByEmail,
} = require("./controllers/users.controllers.js");
const {
  getBasket,
  postToBasket,
  deleteItemFromBasket,
  patchBasket,
} = require("./controllers/basket.controllers.js");
const app = express();
const apiRouter = require("./api-router.js");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/products", getProducts);

app.get("/api/products/:product_id", getProductById);

app.get("/api/users/", getUsers);

app.get("/api/users/id/:user_id", getUserById);

app.get("/api/users/email/:email", getUserByEmail);

app.get("/api/users/:user_id/basket", getBasket);

app.post("/api/users/:user_id/basket", postToBasket);

app.post("/api/users", createUser);

app.delete("/api/users/:user_id/basket", deleteItemFromBasket);

app.patch("/api/users/:user_id/basket", patchBasket);

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else if ((err.code = "42703")) {
    res.status(400).send({ message: "bad request" });
    console.log(err);
  } else console.log(err);
});

app.all("*", (req, res) => {
  res.status(404).send({ message: "endpoint not found!" });
});

module.exports = app;
