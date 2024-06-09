const cors = require("cors");
const express = require("express");
const { getProducts } = require("./controllers/products.controllers.js");
const app = express();
const apiRouter = require("./api-router.js");

app.use(cors());

app.use(express.json());

app.get("/api/products", getProducts);

module.exports = app;
