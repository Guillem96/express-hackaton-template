var User = require('../models/user.model');
var AuthCtrl = require('../controllers/auth.controller');

var UserCtrl = {
  all: (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(users);
      }
    });
  },

  get: (req, res) => {
    let username = req.sessionInfo.user.username;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (!user) {
        res.sendStatus(404);
      } else {
        res.status(200).send(user);
      }
    });
  },

  login: (req, res) => {
    let username = req.body.username;
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        AuthCtrl.login(user, req, res);
      } else {
        res.status(401).json({ msg: "Invalid username." });
      }
    });
  },

  register: (req, res) => {
    let username = req.body.username;
    let password = req.body.password_1;
    let repeatPassword = req.body.password_2;

    if (password !== repeatPassword) {
      res.status(400).json({ msg: "Invalid password "});
    } else {
      var user = new User({ username, password });
      user.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).json({ user, msg: "User " + username + " created successfully" });
        }
      });
    }
  },

  delete: (req, res) => {
    User.findOneAndDelete({ username: req.sessionInfo.user.username }, (err, deletedUser) => {
      if (err) {
        res.status(500).send(err);
      } else if (!deletedUser) {
        res.status(400).json({ msg: "Error, user not found..."});
      } else {
        res.status(200).json({ msg: "User deleted successfully."});
      }
    });
  }
};

module.exports = UserCtrl;