'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
     'flowerPhotos',
     'location',
     Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
     'flowerPhotos',
     'location'
    )
  }
};
