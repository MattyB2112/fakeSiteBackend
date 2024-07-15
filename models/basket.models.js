const db = require("../db/connection.js");

exports.fetchBasket = (id) => {
  return db
    .query(
      `SELECT baskets.*, products.productname, products.productprice, products.productimage1 FROM baskets INNER JOIN products ON baskets.product_id = products.product_id WHERE baskets.user_id = $1 ORDER BY baskets.product_id`,
      [id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return 0;
      }
      console.log(rows);
      return rows;
    });
};

exports.addToBasket = (product_id, quantity, user_id) => {
  console.log(product_id, quantity, user_id, "MODEL");
  return db
    .query(`SELECT * FROM users WHERE user_id = $1`, [user_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "username not found" });
      } else
        return db
          .query(`SELECT * FROM products WHERE product_id = $1`, [product_id])
          .then(({ rows }) => {
            if (rows.length === 0) {
              return Promise.reject({
                status: 404,
                message: "product not found",
              });
            } else
              return db
                .query(
                  `SELECT * FROM baskets WHERE product_id = $1 AND user_id = $2`,
                  [product_id, user_id]
                )
                .then(({ rows }) => {
                  if (rows.length === 0) {
                    return db
                      .query(
                        "INSERT INTO baskets (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;",
                        [user_id, product_id, quantity]
                      )
                      .then(({ rows }) => {
                        return rows[0];
                      });
                  } else {
                    return db.query(
                      `UPDATE baskets SET quantity = quantity + 1 WHERE product_id = $1 AND user_id = $2; `,
                      [product_id, user_id]
                    );
                  }
                });
          });
    });
};

exports.changeBasket = (product_id, quantity, user_id) => {
  return db
    .query(
      `UPDATE baskets SET quantity = quantity + $1 WHERE product_id = $2 AND user_id = $3`,
      [quantity, product_id, user_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows;
    });
};

exports.removeItemFromBasket = (product_id, user_id) => {
  return db
    .query(
      `DELETE FROM baskets WHERE product_id = $1 AND user_id = $2 RETURNING *;`,
      [product_id, user_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "HOYA" });
      }
      return product_id;
    });
};
