const {
  fetchBasket,
  addToBasket,
  removeItemFromBasket,
  changeBasket,
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
  const { product_id, quantity, size } = req.body;
  const { user_id } = req.params;
  addToBasket(product_id, quantity, user_id, size)
    .then((result) => {
      console.log(result);
      res.sendStatus(201).send(product_id);
    })
    .catch(next);
};

exports.patchBasket = (req, res, next) => {
  const { product_id, quantity } = req.body;
  const { user_id } = req.params;
  changeBasket(product_id, quantity, user_id)
    .then((result) => {
      res.sendStatus(201).send(product_id);
    })
    .catch(next);
};

exports.deleteItemFromBasket = (req, res, next) => {
  const { product_id } = req.body;
  const { user_id } = req.params;
  removeItemFromBasket(product_id, user_id)
    .then((result) => {
      res.sendStatus(200).send(product_id);
    })
    .catch(next);
};
