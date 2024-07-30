const db = require("../db/connection.js");
const fs = require("fs/promises");
const {
  fetchUserById,
  createNewUser,
  fetchUserByEmail,
  fetchUsers,
} = require("../models/users.models.js");

exports.getUserById = (req, res) => {
  const id = req.params.user_id;
  fetchUserById(id).then((user) => {
    res.status(200).send({ user: user });
  });
};

exports.getUsers = (req, res) => {
  fetchUsers().then((user) => {
    res.status(200).send({ user: user });
  });
};

exports.getUserByEmail = (req, res) => {
  const { email } = req.body;
  fetchUserByEmail(email).then((user) => {
    res.status(200).send({ user });
  });
};

exports.createUser = (req, res) => {
  const { firstName, surname, email, password } = req.body;
  createNewUser(firstName, surname, email, password).then((result) => {
    res.status(201).send({ user: result });
  });
};
