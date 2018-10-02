var express = require('express');
var router = express.Router();
var UserCtrl = require("../controllers/user.controller");
var jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

// Get a list of all users
router.get("/", getToken, (req, res) => {
  ifLoggedInDo(req, res, (sessionInfo) => {
    UserCtrl.all((err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(users);
      }
    });
  })
});

// Register a user
router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password_1;
  let repeatPassword = req.body.password_2;

  if (password !== repeatPassword) {
    res.status(400).json({ msg: "Invalid password "});
  } else {
    UserCtrl.add(username, password, (err) => {
      if (err)
        res.status(500).send(err);
      else
        res.status(201).json({ msg: "User " + username + " created successfully" });
    });
  }
});

// Login user with bearer authentication
router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  UserCtrl.get(username, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (user && user.password == password) {
      var token = jwt.sign({ user }, SECRET_KEY);
      res.status(200).json({ msg: "Logged in successfully", token });
    } else {
      res.status(401).json({ msg: "Invalid username or password." });
    }
  });
});

// Delete its user
router.delete("/", getToken, (req, res) => {
  ifLoggedInDo(req, res, (sessionInfo) => {
    UserCtrl.delete(sessionInfo.user.username, (err, deletedUser) => {
      if (err) {
        res.status(500).send(err);
      } else if (!deletedUser) {
        res.status(400).json({ msg: "Error, user not found..."});
      } else {
        res.status(200).json({ msg: "User deleted successfully."});
      }
    });
  });
});

function verifyToken(token, onValid, onInvalid = displayMessage) {
  jwt.verify(token, SECRET_KEY, (err, authData) => {
      if (err) {
          onInvalid({ msg: "Invalid token." });
      } else {
          onValid(authData);
      }
  });
}

function getToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if not undefine
  if (typeof bearerHeader !== 'undefined') {
      // split at the space
      const token = bearerHeader.split(' ')[1];
      // Set the token to request
      req.token = token;
      // Call the function after the middleware one
      next();
  } else {
      // Forbidden
      res.sendStatus(403);
  }
}

function ifLoggedInDo(req, res, action) {
  verifyToken(req.token, 
    sessionInfo => action(sessionInfo),
    err => res.status(401).send(err)
  );
}

module.exports = router;