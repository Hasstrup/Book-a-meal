import { combineReducers } from 'redux'
import users from './users/'
import errors from './errors/'

const root = combineReducers({
  users,
  errors
})

export default root;
