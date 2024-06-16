const format = require("pg-format");
const db = require("../connection");

const seed = ({ productData }) => {
  return db
    .query(`DROP TABLE IF EXISTS products;`)

    .then(() => {
      const productsTablePromise = db.query(`
        CREATE TABLE products (
          product_id SERIAL PRIMARY KEY,
          productName VARCHAR,
          productType VARCHAR,
          productCategory VARCHAR,
          productPrice NUMERIC,
          productImage1 VARCHAR,
          productImage2 VARCHAR,
          productImage3 VARCHAR,
          productImage4 VARCHAR,
          about VARCHAR
        );`);

      return Promise.all([productsTablePromise]);
    })

    .then(() => {
      const insertProductsQueryStr = format(
        "INSERT INTO products (productName, productType, productCategory, productPrice, productImage1, productImage2, productImage3, productImage4, about) VALUES %L;",
        productData.map(
          ({
            productName,
            productType,
            productCategory,
            productPrice,
            productImage1,
            productImage2,
            productImage3,
            productImage4,
            about,
          }) => [
            productName,
            productType,
            productCategory,
            productPrice,
            productImage1,
            productImage2,
            productImage3,
            productImage4,
            about,
          ]
        )
      );
      const productsPromise = db.query(insertProductsQueryStr);

      return Promise.all([productsPromise]);
    });
};

module.exports = seed;
