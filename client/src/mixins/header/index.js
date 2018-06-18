import React from 'react';
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
import './styles.scss'

/* eslint-disable  */
const Header = () => (
  <div>
    <LoggedInHeader />
  </div>
);

const LoggedInHeader = () => (
  <header>
    <div className='header'>
      <div className='home-tag'>
        <p className='logo'> Book <br/>
          a meal </p>
      </div>
      <div className='header-buttons'>
         <p className='h1-login-button'> Login </p>
         <p> Sign Up</p>
         <p className='h1-login-button'> Catalogue </p>
      </div>
    </div>
  </header>
);

export default hot(module)(withRouter(Header));
