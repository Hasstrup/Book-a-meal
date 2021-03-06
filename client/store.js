import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import rootReducer from './src/reducers';

// using compose to enforce the proper flow of enhacers
export default createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

