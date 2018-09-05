'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addIndex('Users', {
      fields: ['email', 'username'],
      unique: true
    });
  },

  down: function down(queryInterface, Sequelize) {}
};