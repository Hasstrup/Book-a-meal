import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SignUpUser, LogInUser } from '../../actions/users';
import { DispatchNotification } from '../../actionTypes/misc';
import './index.scss';

const SignUpComponent = ({ renderLogin, handleClick, handleSubmit, handleChange }) => (
  <div className="sign-up-user-form">
    <div className="render-form-single">
      <label htmlFor="email" className="render-form-label"> Email </label>
      <input onChange={handleChange} type="email" required name="email" className="render-form-input" />
    </div>
    <div className="render-form-single">
      <label htmlFor="password" > Password </label>
      <input onChange={handleChange} type="password" required className="render-form-input" name="password" />
    </div>
    { !renderLogin &&
    <Fragment>
      <div className="render-form-single">
        <label htmlFor="name" className="render-form-label"> Full Name</label>
        <input onChange={handleChange} type="text" required className="render-form-input" name="name" />
      </div>
      <div className="render-form-single">
        <label htmlFor="username" className="render-form-label"> Username </label>
        <input onChange={handleChange} required className="render-form-input" name="username" />
      </div>
    </Fragment>
    }
    <button onClick={handleSubmit}> Submit </button>
    <p className="__user_already" onClick={handleClick}>{ renderLogin ? 'Create new account' : 'I already have an account '}</p>
  </div>
);

class AuthenticateUserForm extends Component {
   state = { renderLogin: false, preamble: "Holla. Let's get you started" };
    handleChange = e => this.setState({ [e.target.getAttribute('name')]: e.target.value });

    
    handleSubmit = () => {
      const { email, password, username, name } = this.state;
      const filterThrough = obj => Object.values(obj).filter(item => !item || !item.length).length;
      if (this.state.renderLogin && !filterThrough({ email, password })) return this.props.dispatch(LogInUser({ email, password })(this.props.history));
      if (!filterThrough({ name, password, username, email })) return this.props.dispatch(SignUpUser({ email, password, firstname: name.split(' ')[0], username })(this.props.history));
      this.props.dispatch(DispatchNotification('Hey, please fill in the required fields'));
    }

    render = () => (
      <div className="render-auth-modal" style={{ display: this.props.requiresPermission ? 'flex' : 'none' }}>
        <div className="auth-modal-backdrop" />
        <div className="auth-modal-main">
          <div className="__auth-modal-house">
            <p className="auth-preamble">{this.state.preamble}</p>
            <p className="auth-preamble-text">{this.props.preamble || ''}</p>
          </div>
          <div className="__auth-modal-main">
            <SignUpComponent
              handleClick={() => this.setState({ renderLogin: !this.state.renderLogin, preamble: (this.state.renderLogin ? "Holla. Let's get you started" : 'Hungry again? Nice.') })}
              renderLogin={this.state.renderLogin}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
    requiresPermission: state.users.requiresPermission
})

export default connect(mapStateToProps)(withRouter(AuthenticateUserForm));

