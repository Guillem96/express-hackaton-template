var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;