const db = require("../db/connection.js");

exports.fetchProducts = (
  sort_by = "productprice",
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
    let query = `SELECT * FROM products`;
    for (let i = 0; i < size.length; i++) {
      if (i === 0) {
        query += ` WHERE size${size[i]} != 0`;
      } else {
        query += ` OR size${size[i]} != 0`;
      }
    }
    console.log(query);
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
