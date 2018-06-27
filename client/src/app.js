import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import HomePage from './modules/home/';
import CatalogPage from './modules/catalogue/';
import Header from './mixins/header/';
import Footer from './mixins/footer';

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/catalogue" component={CatalogPage} />
    </Switch>
  </main>
);

const Main = () => (
  <div>
    <Header />
    <App />
    <Footer />
  </div>
);
export default hot(module)(Main);
