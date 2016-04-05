'use strict';
module.exports = function(sequelize, DataTypes) {
  var flowerTaxonomy = sequelize.define('flowerTaxonomy', {
    name: DataTypes.TEXT,
    scientificName: DataTypes.TEXT,
    genus: DataTypes.TEXT,
    order: DataTypes.TEXT,
    family: DataTypes.TEXT,
    lowTemperature: DataTypes.FLOAT,
    highTemperature: DataTypes.FLOAT,
    terrain: DataTypes.TEXT,
    lowHumidity: DataTypes.TEXT,
    highHumidity: DataTypes.TEXT,
    sunlightIntensity: DataTypes.TEXT,
    sunlightFrequency: DataTypes.TEXT,
    waterIntensity: DataTypes.TEXT,
    waterFrequency: DataTypes.TEXT,
    flowerPhotoId: DataTypes.INTEGER,
    location: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.flowerTaxonomy.hasMany(models.flowerPhoto);
      }
    }
  });
  return flowerTaxonomy;
};