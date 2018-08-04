import { combineReducers } from 'redux';
import users from './users/';
import menus from './menus';
import errors from './errors/';
import kitchens from './kitchens';

const root = combineReducers({
  users,
  errors,
  menus,
  kitchens,
});

export default root;
