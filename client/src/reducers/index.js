import { combineReducers } from 'redux';
import users from './users/';
import menus from './menus';
import errors from './errors/';
import kitchens from './kitchens';
import meals from './meals';
import orders from './orders';
import funcs from './funcs';

const root = combineReducers({
  users,
  errors,
  menus,
  kitchens,
  meals,
  orders,
  funcs
});

export default root;
