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
  const { item_id } = req.body;
  const { user_id } = req.params;
  addToBasket(item_id, user_id)
    .then(() => {
      res.status(201).send({ item_id });
    })
    .catch(next);
};
