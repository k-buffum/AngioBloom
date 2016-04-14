'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
     'flowerPhotos',
     'flags',
     Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
     'flowerPhotos',
     'flags'
    )
  }
};
