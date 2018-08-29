import { DataTypes } from 'sequelize';
import { sequelize } from './';

const MealOrders = sequelize.define('mealOrder', {
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  mealId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

export default MealOrders;
