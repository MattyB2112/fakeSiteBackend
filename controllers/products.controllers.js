const db = require("../db/connection.js");
const fs = require("fs/promises");
const {
  fetchProducts,
  fetchProductById,
} = require("../models/products.models.js");

exports.getProducts = (req, res) => {
  fetchProducts().then((products) => {
    res.status(200).send({ products });
  });
};

exports.getProductById = (req, res) => {
  const id = req.params.product_id;
  fetchProductById(id).then((product) => {
    res.status(200).send({ product: product });
  });
};
