import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';

import './styles.scss';

/* eslint-disable  */
const Header = ({ currentUser, history  }) => (
  <div>
   { currentUser ? <LoggedInHeader history={history} /> : <LoggedOutHeader history={history} /> }
  </div>
);

const LoggedOutHeader = ({ history }) => (
  <header>
    <div className='header'>
      <div className='home-tag'>
        <p className='logo' onClick={() => { history.push('/')}}> Book <br/>
          a meal </p>
      </div>
      <div className='header-buttons'>
         <p className='h1-login-button'> Login </p>
         <p> Sign Up</p>
         <p className='h1-login-button' onClick={() => { history.push('/catalogue')}}> Catalogue </p>
      </div>
    </div>
  </header>
);

const LoggedInHeader = ({ history }) => (
  <header>
    <div className='header'>
      <div className='home-tag'>
        <p className='logo' onClick={() => { history.push('/')}}> Book <br/>
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
