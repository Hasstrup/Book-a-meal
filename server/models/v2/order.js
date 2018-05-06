import { DataTypes } from 'sequelize';
import { sequelize } from './';

const Order = sequelize.define('Order', {
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.JSONB
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  }
});

export default Order;
