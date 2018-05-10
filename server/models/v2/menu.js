import { DataTypes } from 'sequelize';
import { sequelize } from './index';

const Menu = sequelize.define('Menu', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  KitchenId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Kitchens',
      key: 'id'
    }
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true
  }
});

export default Menu;
