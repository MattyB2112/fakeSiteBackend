const db = require("../db/connection.js");

exports.fetchBasket = (id) => {
  return db
    .query(`SELECT * FROM baskets WHERE user_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "no items in basket" });
      }
      return rows;
    });
};

exports.addToBasket = (item_id, user_id) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "username not found" });
      } else
        return db
          .query(`SELECT * FROM products WHERE product_id = $1`, [item_id])
          .then(({ rows }) => {
            if (rows.length === 0) {
              return Promise.reject({
                status: 404,
                message: "product not found",
              });
            } else
              return db
                .query(
                  "INSERT INTO baskets (user_id, product_id) VALUES ($1, $2) RETURNING *;",
                  [user_id, item_id]
                )
                .then(({ rows }) => {
                  return rows[0];
                });
          });
    });
};
