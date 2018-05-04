import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Menu = sequelize.define({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING
  }
})

export default Menu;
