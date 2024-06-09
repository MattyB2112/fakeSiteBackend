const db = require("../db/connection.js");

exports.fetchProducts = () => {
  return db.query("SELECT * FROM products").then(({ rows }) => {
    return rows;
  });
};
