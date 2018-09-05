'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addConstraint('Kitchens', ['id'], {
      type: 'unique',
      name: 'kitchen_id_constraint_name'
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Kitchens', 'kitchen_id_constraint_name');
  }
};