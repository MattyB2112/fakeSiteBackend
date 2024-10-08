const db = require("../db/connection.js");
const { convertTimestampToDate } = require("../db/seeds/utils.js");

exports.fetchUserById = (id) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "user_id not found" });
      }
      return rows;
    });
};

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "not found" });
    }
    return rows;
  });
};

exports.fetchUserByEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE userEmail = $1`, [email])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "email not found" });
      }
      return rows;
    });
};

exports.createNewUser = (firstName, surname, email, password, userSince) => {
  return db
    .query(
      "INSERT INTO users (userfirstName, userlastName, useremail, userpassword, usersince) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [firstName, surname, email, password, userSince]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateUser = (newDetails) => {
  return db
    .query(
      "UPDATE users SET userfirstname = $1, userlastname = $2, useraddress1 = $3, useraddress2 = $4, useraddress3 = $5, userpostcode = $6 WHERE user_id = $7 RETURNING *;",
      [
        newDetails.newFirstName,
        newDetails.newSurname,
        newDetails.newAddress1,
        newDetails.newAddress2,
        newDetails.newAddress3,
        newDetails.newPostcode,
        newDetails.user_id,
      ]
    )
    .then(({ rows }) => {
      return rows;
    });
};
