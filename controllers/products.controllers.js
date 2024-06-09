const db = require("../db/connection.js");
const fs = require("fs/promises");
const { fetchProducts } = require("../models/products.models.js");

exports.getProducts = (req, res) => {
  fetchProducts().then((products) => {
    res.status(200).send({ products });
  });
};
