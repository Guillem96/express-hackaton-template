var jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

var AuthCtrl = {
  login: (user, req, res) => {
    let password = req.body.password;
    if (password && user.password == password) {
      var token = jwt.sign({ user }, SECRET_KEY);
      res.status(200).json({ msg: "Logged in successfully", token });
    } else {
      res.status(401).json({ msg: "Invalid username or password." });
    }
  },
  authRequired: (req, res, next) => {
    getToken(req, res, (token) => {
      verifyToken(token, 
        sessionInfo => {
          req.sessionInfo = sessionInfo;
          next();
        },
        err => res.status(401).send(err)
      );
    });
  }
};

function getToken(req, res, callback) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  // Check if not undefine
  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const token = bearerHeader.split(' ')[1];
    callback(token);
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function verifyToken(token, onValid, onInvalid = displayMessage) {
  jwt.verify(token, SECRET_KEY, (err, authData) => {
      if (err) {
          onInvalid({ msg: "Invalid token." });
      } else {
          onValid(authData);
      }
  });
}

module.exports = AuthCtrl;