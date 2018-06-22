import React, { Component } from 'react';
import checkForNullInput from '../../../helpers/formsHelpers';

/* eslint jsx-quotes: 0, max-len: 0, no-unused-expressions: 0, object-curly-newline: 0 */

/**
 * @name AuthComponent
 * @desc contains the log in and sign up form that dynamically renders on click. 
 * @returns
 */
class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wantsToLogIn: false,
      errorMessage: '',
      password: '',
      username: '',
      email: '',
      fullName: ''
    };
  }

  // methods and event listeners
  handleClick = () => this.setState({ wantsToLogIn: !this.state.wantsToLogIn })

  handleSubmit = () => {
    this.state.wantsToLogIn ? this.handleLogin() : this.handleSignUp();
  };

  handleLogin = () => {
    const loginObject = { email: this.state.email, password: this.state.password };
    if (checkForNullInput(loginObject)) return this.setState({ errorMessage: 'Hey, Please fill in all the fields' });
    // do something to log in;
    this.props.logInUser(loginObject);
  }

  handleSignUp = () => {
    const signUpObject = { email: this.state.email, password: this.state.password, username: this.state.username, fullName: this.state.fullName };
    if (checkForNullInput(signUpObject)) return this.setState({ errorMessage: 'Hey, Please fill in all the fields' }); 
    // if (this.state.password !== this.state.confirmPassword) return this.setState({ errorMessage: 'Hey, those passwords dont match '});  
    this.props.createUser({ ...signUpObject, firstname: this.state.fullName.split(' ')[0] });
  }

handleChange = (e) => {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}


  // tiny components to be refactored
  LoginForm = () => (
    <div className='form-group'>
      <div>
        <div className='form-input-group type-2'>
          <label htmlFor='email'> Email </label>
          <input name="email" onChange={this.handleChange} className='type-input' type='text' />
        </div>
      </div>

      <div className='section'>
        <div className='form-input-group'>
          <label htmlFor='password'> Password </label>
          <input name="password" onChange={this.handleChange} className='type-input' type='password' />
        </div>
      </div>

      <div className='submit-button' onClick={() => { this.handleSubmit(); }}>
        Log In
      </div>
      <p className='got-an-account-id' onClick={() => { this.handleClick(); }}> I already have an account </p>
      <p className='got-an-account-id' onClick={() => { this.handleClick(); }}> { this.state.errorMessage } </p>
    </div>
  )


 SignUpForm = () => (
   <div className='form-group'>
     { this.firstFormSection }
     { this.secondFormSection }
     <div className='submit-button' onClick={() => { this.handleSubmit(); }}>
        Sign Up
     </div>
     <p className='got-an-account-id' onClick={() => { this.handleClick(); }}> I already have an account </p>
     <p className='got-an-account-id' onClick={() => { this.handleClick(); }}> { this.state.errorMessage } </p>
   </div>
 );

  firstFormSection = (
    <div className='section'>
      <div className='form-input-group'>
        <label htmlFor='fullName'> Full Name </label>
        <input className='type-input' onChange={this.handleChange} name='fullName' type='text' />
      </div>

      <div className='form-input-group type-2'>
        <label htmlFor='email'> Email </label>
        <input name='email' onChange={this.handleChange} className='type-input' type='text' />
      </div>
    </div>
  )

  secondFormSection = (
    <div className='section'>
      <div className='form-input-group'>
        <label htmlFor='password'> Password </label>
        <input name='password' onChange={this.handleChange} className='type-input' type='password'/>
      </div>

      <div className='form-input-group type-2'>
        <label htmlFor='confirmPassword'> Username </label>
        <input name='username' onChange={this.handleChange} className='type-input' type='text'/>
      </div>
    </div>
  )


  clicker = () => (
    <div>
      <div className='submit-button' onClick={() => { this.handleSubmit(); }}>
        Sign Up
      </div>
      <p className='got-an-account-id' onClick={() => { this.handleClick(); }}> I already have an account </p>
      <p className='got-an-account-id' onClick={() => { this.handleClick(); }}> { this.state.errorMessage } </p>
    </div>
  )

  /* eslint react/no-unescaped-entities: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-noninteractive-element-interactions: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-static-element-interactions: 0 */
  Preamble = () => (
    <div className='preamble-text'>
      <p className='main-bold-text'>{ this.state.wantsToLogIn ? 'Hungry again. Me too' : 'Sign Up. Get fed'}</p>
      { this.state.wantsToLogIn ? null :
      <p className='extras'> Create an account with <span> Book A Meal</span>, get the best menu options and
              the most ridiculous deals you might find anywhere else, and you have our word for that.
              Let's have you join us!
      </p>
      }
    </div>
  )

  render = () => (
    <div className='create-account-center'>
      { this.Preamble() }
      { this.state.wantsToLogIn ? this.LoginForm() : this.SignUpForm()}
    </div>
  )
}

export default AuthComponent;
