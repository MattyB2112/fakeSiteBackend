const format = require("pg-format");
const db = require("../connection");
const { convertTimestampToDate } = require("./utils");

const seed = ({ productData, usersData, basketsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS baskets;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS products;`);
      });
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
          userSince TIMESTAMP
        );`);

      return Promise.all([productsTablePromise, usersTablePromise]);
    })
    .then(() => {
      return db.query(`
  CREATE TABLE baskets (
    user_id INT REFERENCES users(user_id),
    basketSize INT
  );`);
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

      const formattedUsersData = usersData.map(convertTimestampToDate);

      const insertUsersQueryStr = format(
        "INSERT INTO users (userFirstName, userLastName, userEmail, userImage, userAddress1, userAddress2, userAddress3, userPostcode, userSince) VALUES %L;",
        formattedUsersData.map(
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

      const insertBasketsQueryStr = format(
        "INSERT INTO baskets (user_id, basketSize) VALUES %L;",
        basketsData.map(({ user_id, basketSize }) => [user_id, basketSize])
      );

      const basketsPromise = db.query(insertBasketsQueryStr);

      return Promise.all([productsPromise, usersPromise, basketsPromise]);
    });
};

module.exports = seed;
