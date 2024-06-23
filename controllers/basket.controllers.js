const { fetchBasket, addToBasket } = require("../models/basket.models.js");

exports.getBasket = (req, res, next) => {
  const { user_id } = req.params;
  fetchBasket(user_id)
    .then((basket) => {
      res.status(200).send({ basket: basket });
    })
    .catch(next);
};

exports.postToBasket = (req, res, next) => {
  const { product_id } = req.body;

  const { user_id } = req.params;
  addToBasket(product_id, user_id)
    .then((result) => {
      console.log(result);
      res.status(201).send({ product_id });
    })
    .catch(next);
};
