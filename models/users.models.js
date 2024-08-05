const db = require("../db/connection.js");
const { convertTimestampToDate } = require("../db/seeds/utils.js");

exports.fetchUserById = (id) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "not found" });
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
        return Promise.reject({ status: 404, message: "not found" });
      }
      return rows[0];
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
