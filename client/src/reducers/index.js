import { combineReducers } from 'redux';
import users from './users/';
import menus from './menus';
import errors from './errors/';
import kitchens from './kitchens';
import meals from './meals';

const root = combineReducers({
  users,
  errors,
  menus,
  kitchens,
  meals
});

export default root;
