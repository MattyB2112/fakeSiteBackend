const db = require("../db/connection.js");

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

exports.createNewUser = (firstName, surname, email, password) => {
  return db
    .query(
      "INSERT INTO users (userfirstName, userlastName, useremail, userpassword) VALUES ($1, $2, $3, $4) RETURNING *;",
      [firstName, surname, email, password]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
