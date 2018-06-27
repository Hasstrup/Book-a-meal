import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';

import './styles.scss';

/* eslint-disable  */
const Header = ({ currentUser }) => (
  <div>
   { currentUser ? <LoggedInHeader /> : <LoggedOutHeader /> }
  </div>
);

const LoggedOutHeader = () => (
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

const LoggedInHeader = () => (
  <header>
    <div className='header'>
      <div className='home-tag'>
        <p className='logo'> Book <br/>
          a meal </p>
      </div>
      <div className='header-buttons'>
         <p className='h1-login-button'> Cart & Orders </p>
         <p> Workstation </p>
         <p className='h1-login-button'> Catalogue </p>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.current
  }
}

export default connect(mapStateToProps)(withRouter(Header))
