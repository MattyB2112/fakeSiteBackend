const db = require("../db/connection.js");
const fs = require("fs/promises");
const { fetchUserById } = require("../models/users.models.js");

exports.getUserById = (req, res) => {
  const id = req.params.user_id;
  fetchUserById(id).then((user) => {
    res.status(200).send({ user: user });
  });
};
