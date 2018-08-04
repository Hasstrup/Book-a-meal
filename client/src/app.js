import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import HomePage from './modules/home/';
import CatalogPage from './modules/catalogue';
import ShowMenuPage from './modules/ShowMenu';
import WorkStationPage from './modules/WorkStation';
import CartAndOrdersPage from './modules/ShowOrders';
import ToastComponent from './mixins/ErrorHandler';
import Header from './mixins/header/';
import Footer from './mixins/footer';
import ProcessIndicator from './mixins/ProcessIndicator';
import { CacheHandler } from './actions/helpers';
import store from '../store';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/catalogue" component={CatalogPage} />
      <Route exact path="/menu" component={ShowMenuPage} />
      <Route exact path="/profile" component={WorkStationPage} />
      <Route exact path="/orders" component={CartAndOrdersPage} />
    </Switch>
  </main>
);

const Main = () => (
  <div>
    <Header />
    <ProcessIndicator />
    <ToastComponent />
    <App />
    <Footer />
  </div>
);

/* Immediately check for a logged in user on sign up */
(function () {
  if (CacheHandler().getContent('#user!!@##$')) return store.dispatch({ type: 'NEW_SIGN_IN', payload: JSON.parse(CacheHandler().getContent('#user!!@##$')) });
}());

export default hot(module)(Main);
