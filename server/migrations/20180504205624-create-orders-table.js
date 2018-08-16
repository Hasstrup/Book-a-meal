'use strict';

/* eslint: arrow-body-style: 0 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      content: {
        type: Sequelize.JSON
      },
      clientId: {
        type: Sequelize.UUID
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Orders');
  }
};
