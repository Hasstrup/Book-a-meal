import { combineReducers } from 'redux';
import users from './users/';
import menus from './menus';
import errors from './errors/';

const root = combineReducers({
  users,
  errors,
  menus
});

export default root;
