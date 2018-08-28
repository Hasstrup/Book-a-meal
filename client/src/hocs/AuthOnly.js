import React, { Component, Fragment } from 'react';
import { GetLoggedInUser } from '../actions/users';
import { DispatchNotification, RequiresPermission, ResolvePermission } from '../actionTypes/misc';

const AuthoWrapper = Comp => class WrappedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ready: true };
    if (!GetLoggedInUser()) {
      const { dispatch } = this.props;
      const payload = () => {
        dispatch(ResolvePermission());
        window.location.reload();
        dispatch(DispatchNotification('Hello and welcome!'));
      };
      dispatch({ type: 'NEW_PENDING_FUNCTION', payload });
      dispatch(RequiresPermission());
      this.state.ready = false;
    }
    // this will end up being redundant
  }
        render = () => (
          <Fragment>
            { this.state && this.state.ready && <Comp {...this.props} /> }
            { !this.state.ready && null }
          </Fragment>
        )
};

export default AuthoWrapper;
