'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('flowerTaxonomies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      scientificName: {
        type: Sequelize.TEXT
      },
      genus: {
        type: Sequelize.TEXT
      },
      order: {
        type: Sequelize.TEXT
      },
      family: {
        type: Sequelize.TEXT
      },
      lowTemperature: {
        type: Sequelize.FLOAT
      },
      highTemperature: {
        type: Sequelize.FLOAT
      },
      terrain: {
        type: Sequelize.TEXT
      },
      lowHumidity: {
        type: Sequelize.TEXT
      },
      highHumidity: {
        type: Sequelize.TEXT
      },
      sunlightIntensity: {
        type: Sequelize.TEXT
      },
      sunlightFrequency: {
        type: Sequelize.TEXT
      },
      waterIntensity: {
        type: Sequelize.TEXT
      },
      waterFrequency: {
        type: Sequelize.TEXT
      },
      flowerPhotoId: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('flowerTaxonomies');
  }
};