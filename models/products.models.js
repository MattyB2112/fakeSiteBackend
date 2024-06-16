const db = require("../db/connection.js");

exports.fetchProducts = () => {
  return db.query("SELECT * FROM products").then(({ rows }) => {
    return rows;
  });
};

exports.fetchProductById = (id) => {
  return db
    .query(`SELECT * FROM products WHERE product_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "not found" });
      }
      return rows;
    });
};
