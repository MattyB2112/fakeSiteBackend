const apiRouter = require("express").Router();
const { getProducts } = require("./controllers/products.controllers.js");

apiRouter.get("/products", getProducts);

module.exports = apiRouter;
