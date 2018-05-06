import { DataTypes } from 'sequelize';
import { sequelize } from './';

const MealOrders = sequelize.define('MealOrder', {
  OrderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  MealId: {
    type: DataTypes.UUID,
    allowNull: false
  },
});

// MealOrders.sync({ force: true });

export default MealOrders
