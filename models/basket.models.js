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

      return rows;
    });
};

exports.addToBasket = (product_id, quantity, user_id, size) => {
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
                  `SELECT * FROM baskets WHERE product_id = $1 AND user_id = $2 AND size = $3`,
                  [product_id, user_id, size]
                )
                .then(({ rows }) => {
                  if (rows.length === 0) {
                    return db
                      .query(
                        "INSERT INTO baskets (user_id, product_id, quantity, size) VALUES ($1, $2, $3, $4) RETURNING *;",
                        [user_id, product_id, quantity, size]
                      )
                      .then(({ rows }) => {
                        return rows[0];
                      });
                  } else {
                    return db.query(
                      `UPDATE baskets SET quantity = quantity + 1 WHERE product_id = $1 AND user_id = $2 AND size = $3; `,
                      [product_id, user_id, size]
                    );
                  }
                });
          });
    });
};

exports.changeBasket = (product_id, quantity, user_id, size) => {
  return db
    .query(
      `UPDATE baskets SET quantity = quantity + $1 WHERE product_id = $2 AND user_id = $3 AND size = $4 RETURNING *;`,
      [quantity, product_id, user_id, size]
    )
    .then(() => {
      this.fetchBasket(user_id).then((result) => {
        console.log(result);
        for (let i = 0; i < result.length; i++)
          if (result[i].quantity === 0) {
            this.removeItemFromBasket(product_id, user_id, size);
          }
      });
    });
};

exports.removeItemFromBasket = (product_id, user_id, size) => {
  return db
    .query(
      `DELETE FROM baskets WHERE product_id = $1 AND user_id = $2 AND size = $3 RETURNING *;`,
      [product_id, user_id, size]
    )
    .then(({ rows }) => {
      // if (rows.length === 0) {
      //   return Promise.reject({ status: 404, message: "HOYA" });
      // }
      return product_id;
    });
};
