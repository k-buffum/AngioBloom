'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.flower_photo);
      },
      authenticate: function(email, password, callback) {
        this.find({
          where: { email: email }
        }).then(function(user) {
          // callback 1st argument (null) is an error, second (false) returns there is no user
          if (!user) return callback(null, false);
          // compares users password to stored password in db
          bcrypt.compare(password, user.password, function(err, result) {
            if (err) return callback(err);
            // "result ? user : false" terinary function, if true it will return user, if false it will return false
            callback(null, result ? user : false);
          });
        });
      }
    },
    // hooks run before we save data into data base
    hooks: {
      beforeCreate: function(user, options, callback) {
        // check to see if password exists in input field
        if (user.password) {
          // hashes password, 10 is representing how many times the password is salted with hash
          bcrypt.hash(user.password, 10, function(err, hash) {
            //if an error is returned the error is shown to the user
            if (err) return callback(err);
            //re-assigns password to hash if password was successfully hashed
            user.password = hash;
            // notify sequelize that the hash password is created and added to db
            // null is representing error, if no error the user is passed
            callback(null, user);
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};