const {
  fetchProducts,
  fetchProductById,
} = require("../models/products.models.js");

exports.getProducts = (req, res, next) => {
  const { sort_by, order_by } = req.query;
  fetchProducts(sort_by, order_by)
    .then((products) => {
      res.status(200).send({ products });
    })
    .catch(next);
};

exports.getProductById = (req, res, next) => {
  const id = req.params.product_id;
  fetchProductById(id)
    .then((product) => {
      res.status(200).send({ product: product });
    })
    .catch(next);
};
