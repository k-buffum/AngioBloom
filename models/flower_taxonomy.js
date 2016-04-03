'use strict';
module.exports = function(sequelize, DataTypes) {
  var flower_taxonomy = sequelize.define('flower_taxonomy', {
    name: DataTypes.TEXT,
    scientificName: DataTypes.TEXT,
    genus: DataTypes.TEXT,
    order: DataTypes.TEXT,
    family: DataTypes.TEXT,
    lowTemperature: DataTypes.FLOAT,
    highTemperature: DataTypes.FLOAT,
    terrain: DataTypes.TEXT,
    humidity: DataTypes.FLOAT,
    sunlight_intensity: DataTypes.INTEGER,
    sunlight_frequency: DataTypes.INTEGER,
    water_intensity: DataTypes.INTEGER,
    water_frequency: DataTypes.INTEGER,
    flower_photoID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.flower_taxonomy.hasMany(models.flower_photo);
      }
    }
  });
  return flower_taxonomy;
};