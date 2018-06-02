import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import HomeComponent from './modules/home/';
import Header from './mixins/header/'

const App = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomeComponent} />
    </Switch>
  </main>
);

const Main = () => (
  <div>
    <Header />
    <App />
  </div>
)
export default hot(module)(Main)
