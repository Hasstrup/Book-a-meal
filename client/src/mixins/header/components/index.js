import React from 'react';
import { LogOutUser } from '../../../actions/users/'

/**
   * @name LoggedOutHeader
   * @description This header would only be rendered when there is no user in session
   * @param {object} props the props containing the history object for navigation
   * @returns {function} React Component
   */
export const LoggedOutHeader = ({ history }) => (
  <header>
    <div className="header">
      <div className="home-tag">
        <p className="logo" onClick={() => { history.push('/'); }}> Book <br />
            a meal
        </p>
      </div>
      <div className="header-buttons">
        <p className="h1-login-button"> Login </p>
        <p> Sign Up</p>
        <p className="h1-login-button" onClick={() => { history.push('/catalogue'); }}> Catalogue </p>
      </div>
    </div>
  </header>
);


  /**
   * @name LoggedInHeader
   * @description This header would only be rendered when a user is logged in
   * @param {object} props the props containing the history object for navigation
   * @returns {function} React Component
   */
export const LoggedInHeader = ({ history }) => (
  <header>
    <div className="header">
      <div className="home-tag">
        <p className="logo" onClick={() => { history.push('/'); }}> Book <br />
            a meal
          </p>
      </div>
      <div className="header-buttons">
        <p className="h1-login-button" onClick={() => { history.push('/orders')}}> Cart & Orders </p>
        <p onClick={() => { history.push('/profile')}} > Workstation </p>
        <p className="h1-login-button" onClick={() => { history.push('/catalogue')}}> Catalogue </p>
        <p className="h1-login-button" onClick={() => { LogOutUser(history) }}> Logout </p>
      </div>
    </div>
  </header>
);
