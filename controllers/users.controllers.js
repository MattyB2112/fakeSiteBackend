const db = require("../db/connection.js");
const fs = require("fs/promises");
const {
  fetchUserById,
  createNewUser,
  fetchUserByEmail,
  fetchUsers,
} = require("../models/users.models.js");
const { convertTimestampToDateUsers } = require("../db/seeds/utils.js");

exports.getUserById = (req, res, next) => {
  const id = req.params.user_id;
  fetchUserById(id)
    .then((user) => {
      res.status(200).send({ user: user });
    })
    .catch(next);
};

exports.getUsers = (req, res) => {
  fetchUsers().then((user) => {
    res.status(200).send({ user: user });
  });
};

exports.getUserByEmail = (req, res, next) => {
  const email = req.params.email;
  fetchUserByEmail(email)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.createUser = (req, res) => {
  const timestamp = Date.now();
  const { firstName, surname, email, password } = req.body;
  const newUser = {
    firstName: firstName,
    surname: surname,
    email: email,
    password: password,
    userSince: new Date(timestamp),
  };
  const formattedUserData = convertTimestampToDateUsers(newUser);
  console.log(formattedUserData);
  createNewUser(
    formattedUserData.firstName,
    formattedUserData.surname,
    formattedUserData.email,
    formattedUserData.password,
    formattedUserData.userSince
  ).then((result) => {
    res.status(201).send({ newUser: result });
  });
};
