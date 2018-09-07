import { DataTypes } from 'sequelize';
import { sequelize } from './';

const Meal = sequelize.define('meal', {
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  kitchenId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  menuId: {
    type: DataTypes.UUID
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
});

export default Meal;
