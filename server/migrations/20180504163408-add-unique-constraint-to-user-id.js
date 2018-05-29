'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Kitchens', ['id'], {
      type: 'unique',
      name: 'kitchen_id_constraint_name'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Kitchens', 'kitchen_id_constraint_name');
  }
};
