const {
  fetchBasket,
  addToBasket,
  removeItemFromBasket,
} = require("../models/basket.models.js");

exports.getBasket = (req, res, next) => {
  const { user_id } = req.params;
  fetchBasket(user_id)
    .then((basket) => {
      res.status(200).send({ basket: basket });
    })
    .catch(next);
};

exports.postToBasket = (req, res, next) => {
  const { product_id, quantity } = req.body;
  const { user_id } = req.params;
  addToBasket(product_id, quantity, user_id)
    .then((result) => {
      console.log(result);
      res.sendStatus(201).send(product_id);
    })
    .catch(next);
};

exports.deleteItemFromBasket = (req, res, next) => {
  const { product_id } = req.params;
  removeItemFromBasket(product_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};
