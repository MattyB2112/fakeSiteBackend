const format = require("pg-format");
const db = require("../connection");

const seed = ({ productData }) => {
  return db
    .query(`DROP TABLE IF EXISTS products;`)

    .then(() => {
      const productsTablePromise = db.query(`
        CREATE TABLE products (
          productName VARCHAR,
          productType VARCHAR,
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
        "INSERT INTO products ( productName, productType, productPrice, productImage1, productImage2, productImage3, productImage4, about) VALUES %L;",
        productData.map(
          ({
            productName,
            productType,
            productPrice,
            productImage1,
            productImage2,
            productImage3,
            productImage4,
            about,
          }) => [
            productName,
            productType,
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
