import { DataTypes } from 'sequelize';
import { sequelize } from './';

const Meal = sequelize.define('Meal', {
  name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  }
});

export default Meal
