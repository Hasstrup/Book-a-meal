'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addIndex('Users', {
      fields: ['email', 'username'],
      unique: true
    });
  },

  down: (queryInterface, Sequelize) => {

  }
};
