import React, { Component } from 'react'

/* eslint jsx-quotes: 0, max-len: 0  */
class AuthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wantsToLogIn: false,
    };
  }

  componentDidMount() {
    console.log('Hello there')
  }
// methods and event listeners
  handleClick = () => this.setState({ wantsToLogIn: !this.state.wantsToLogIn })

  handleSubmit = () => {
  return this.state.wantsToLogIn ? this.handleLogin() : this.handleSignUp
  }


// tiny components to be refactored
  LoginForm = () => (
    <div className='form-group'>
      <div>
        <div className='form-input-group type-2'>
          <label htmlFor='email'> Email </label>
          <input className='type-input' type='text' />
        </div>
      </div>

      <div className='section'>
        <div className='form-input-group'>
          <label htmlFor='password'> Password </label>
          <input className='type-input' type='password' />
        </div>
      </div>

      <div className='submit-button' onClick={() => { this.handleSubmit() }}>
        Sign Up
      </div>
      <p className='got-an-account-id' onClick={() => { this.handleClick() }}> I already have an account </p>
    </div>
  )


  SignUpForm = () => (
    <div className='form-group'>
      { this.firstFormSection }
      { this.secondFormSection }
      <div className='submit-button' onClick={() => { this.handleSubmit() }}>
        Sign Up
      </div>
      <p className='got-an-account-id' onClick={() => { this.handleClick() }}> I already have an account </p>
    </div>
   )



  firstFormSection = (
    <div className='section'>
      <div className='form-input-group'>
        <label htmlFor='full-name'> Full Name </label>
        <input className='type-input' name='full-name' type='text' />
      </div>

      <div className='form-input-group type-2'>
        <label htmlFor='email'> Email </label>
        <input name='email' className='type-input' type='text' />
      </div>
    </div>
  )



  secondFormSection = (
    <div className='section'>
      <div className='form-input-group'>
        <label htmlFor='password'> Password </label>
        <input name='password' className='type-input' type='password'/>
      </div>

      <div className='form-input-group type-2'>
        <label htmlFor='c-password'> Confirm Password </label>
        <input name='c-password' className='type-input' type='password'/>
      </div>
    </div>
  )


  clicker = () => (
    <div>
      <div className='submit-button' onClick={() => { this.handleSubmit() }}>
        Sign Up
      </div>
      <p className='got-an-account-id' onClick={() => { this.handleClick() }}> I already have an account </p>
    </div>
  )


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
