import { DataTypes } from 'sequelize';
import { sequelize } from './';

const Order = sequelize.define('Order', {
  content: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

export default Order;
