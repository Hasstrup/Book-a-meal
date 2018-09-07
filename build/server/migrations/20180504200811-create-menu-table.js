'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Menus', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: 'https://d2d00szk9na1qq.cloudfront.net/Product/8c8a442f-238a-4644-afc4-d46ef7778b5d/Images/Large_RFR-005.jpg'
      },
      id: {
        type: Sequelize.UUID
      },
      Kitchen_id: {
        type: Sequelize.UUID
      }
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Menus');
  }
};