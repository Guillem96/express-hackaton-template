'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

// Connect to remote database
var mongoUrl = process.env.NODE_ENV === 'test' 
                  ? process.env.DB_URL_TEST 
                  : process.env.DB_URL;
mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl, { useNewUrlParser: true });

// Setting up express
app.use(bodyParser.urlencoded({'extended': 'true' }));
app.use(bodyParser.json());

// CORS Origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// Setting the routers
app.use("/users", require("./routers/user.router"));

mongoose.connection.on('connected', function () {
  console.log("Connected to database");

  // Start the server after mongoose has
  app.listen(process.env.PORT || 3000, function () {
    console.log("App is listening on port " + (process.env.PORT || 3000));
  });
});

module.exports = app; // for testing
