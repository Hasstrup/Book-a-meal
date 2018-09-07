'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Kitchens', {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false
      },
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
        defaultValue: 'https://dribbble.com/shots/2400802-Kitchen-Icon'
      },
      User_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Kitchens');
  }
};