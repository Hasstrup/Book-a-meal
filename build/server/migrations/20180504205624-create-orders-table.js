'use strict';

/* eslint: arrow-body-style: 0 */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      content: {
        type: Sequelize.JSON
      },
      clientId: {
        type: Sequelize.UUID
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Orders');
  }
};