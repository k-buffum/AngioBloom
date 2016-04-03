'use strict';
module.exports = function(sequelize, DataTypes) {
  var flower_photo = sequelize.define('flower_photo', {
    userID: DataTypes.INTEGER,
    flower_taxonomyID: DataTypes.INTEGER,
    picture: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.flower_photo.belongsTo(models.flower_taxonomy);
        models.flower_photo.belongsTo(models.user);
      }
    }
  });
  return flower_photo;
};