const db = require("../db/connection.js");

exports.fetchProducts = (
  sort_by = "product_id",
  order = "ASC",
  size = "all"
) => {
  if (size === "all") {
    return db
      .query(`SELECT * FROM products ORDER BY ${sort_by} ${order}`)
      .then(({ rows }) => {
        return rows;
      });
  } else {
    let newSize = Number(size);
    let query = `SELECT * FROM products WHERE size${newSize} != 0`;
    query += ` ORDER BY ${sort_by} ${order}`;
    return db.query(query).then(({ rows }) => {
      return rows;
    });
  }
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
