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
