'use strict';
module.exports = function(sequelize, DataTypes) {
  var flowerPhoto = sequelize.define('flowerPhoto', {
    userId: DataTypes.INTEGER,
    flowerTaxonomyId: DataTypes.INTEGER,
    picture: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    location: DataTypes.STRING,
    flags: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.flowerPhoto.belongsTo(models.flowerTaxonomy);
        models.flowerPhoto.belongsTo(models.user);
      }
    }
  });
  return flowerPhoto;
};