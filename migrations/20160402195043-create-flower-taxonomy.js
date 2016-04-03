'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('flower_taxonomies', {
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
      humidity: {
        type: Sequelize.FLOAT
      },
      sunlight_intensity: {
        type: Sequelize.INTEGER
      },
      sunlight_frequency: {
        type: Sequelize.INTEGER
      },
      water_intensity: {
        type: Sequelize.INTEGER
      },
      water_frequency: {
        type: Sequelize.INTEGER
      },
      flower_photoID: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('flower_taxonomies');
  }
};