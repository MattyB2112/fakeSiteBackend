const format = require("pg-format");
const db = require("../connection");

const seed = ({ productData, usersData }) => {
  return db
    .query(`DROP TABLE IF EXISTS products;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })

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

      const usersTablePromise = db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          userFirstName VARCHAR,
          userLastName VARCHAR,
          userEmail VARCHAR,
          userImage VARCHAR DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700',
          userAddress1 VARCHAR,
          userAddress2 VARCHAR,
          userAddress3 VARCHAR,
          userPostcode VARCHAR,
          userSince TIMESTAMP DEFAULT NOW ()
        );`);

      return Promise.all([productsTablePromise, usersTablePromise]);
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

      const insertUsersQueryStr = format(
        "INSERT INTO users (userFirstName, userLastName, userEmail, userImage, userAddress1, userAddress2, userAddress3, userPostcode, userSince) VALUES %L;",
        usersData.map(
          ({
            userFirstName,
            userLastName,
            userEmail,
            userImage,
            userAddress1,
            userAddress2,
            userAddress3,
            userPostcode,
            userSince,
          }) => [
            userFirstName,
            userLastName,
            userEmail,
            userImage,
            userAddress1,
            userAddress2,
            userAddress3,
            userPostcode,
            userSince,
          ]
        )
      );
      const usersPromise = db.query(insertUsersQueryStr);

      return Promise.all([productsPromise, usersPromise]);
    });
};

module.exports = seed;
