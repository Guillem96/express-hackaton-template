var express = require('express');
var router = express.Router();
var UserCtrl = require("../controllers/user.controller");
var AuthCtrl = require("../controllers/auth.controller");

const SECRET_KEY = process.env.SECRET_KEY;

// Get a list of all users
router.get("/", AuthCtrl.authRequired, UserCtrl.all);

// Register a user
router.post("/", UserCtrl.register);

// Login user with bearer authentication
router.post("/login", UserCtrl.login);

// Delete its user
router.delete("/", AuthCtrl.authRequired, UserCtrl.delete);

module.exports = router;