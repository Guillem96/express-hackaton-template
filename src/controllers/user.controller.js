var User = require('../models/user.model');

var UserCtrl = {
  /** 
   * callback: function(err, users)
  */
  all: callback => {
    User.find({}, callback);
  },

  /** 
   * username: string
   * callback: function(err, user)
  */
  get: (username, callback) =>  User.findOne({ username }, callback),
  
  /** 
   * username: string
   * password: string
   * callback: function(err)
  */
  add: (username, password, callback) => {
    var user = new User({ username, password });
    user.save(callback);
  },

  /** 
   * username: string
   * callback: function(err, deleted_user)
  */
  delete: (username, callback) => {
    User.findOneAndDelete({ username }, callback);
  }
};

module.exports = UserCtrl;