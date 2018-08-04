import React from 'react';
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { LoggedInHeader, LoggedOutHeader } from './components';
import { GetLoggedInUser } from '../../actions/users'
import './styles.scss';

/* eslint-disable  */
/**
 * 
 * @param {object} props object containing the current user and the history object for navigation 
 * @name Header
 * @description Header component of the application. Dynamically renders variant on the
 *  presence of a logged in user.
 * @returns {function} React Commponent 
 */
const Header = ({ currentUser, history  }) => (
    <div>
     { currentUser ? <LoggedInHeader history={history} /> : <LoggedOutHeader history={history} /> }
    </div>
  );

/**
 * 
 * @param {obj} state - the current state of the application 
 * @description mapStateToProps for react-redux
 */
const mapStateToProps = () => {
  return {
    currentUser: GetLoggedInUser()
  }
}

export default connect(mapStateToProps)(withRouter(Header))
