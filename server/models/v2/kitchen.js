import { DataTypes } from 'sequelize';
import { sequelize } from './';
import Menu from './menu';
import Meal from './meal';


const Kitchen = sequelize.define('Kitchen', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString(value) {
        if (value.constructor !== String) {
          throw new Error('name must be string');
        }
      }
    }
  },
  ofTheDay: {
    type: DataTypes.UUID
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false
  }
}, {

});

/* eslint func-names: 0, no-return-await: 0 */
Kitchen.prototype.getMenuOfTheDay = async function () {
  const value = this.getDataValue('ofTheDay');
  const menu = await Menu.findOne({ where: { id: value }, include: [Meal] });
  console.log(await menu.getMeals());
  return menu;
};


export default Kitchen;
