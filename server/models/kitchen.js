import { DataTypes } from 'sequelize'
import { sequelize } from './';

const Kitchen = sequelize.define('Kitchen', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  }
})

export default Kitchen;
