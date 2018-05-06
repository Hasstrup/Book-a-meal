import { DataTypes } from 'sequelize';
import { sequelize } from './';

const Meal = sequelize.define('Meal', {
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  KitchenId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  MenuId: {
    type: DataTypes.UUID
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Meal
