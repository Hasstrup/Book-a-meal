import React from 'react'

const LoginFormComponent = () => (
  <div className='create-account-center'>
      <div className='preamble-text'>
        <p className='main-bold-text'> Sign Up. Get Fed</p>
        <p className='extras'> Create an account with <span> Book A Meal</span>, get the best menu options and
            the most ridiculous deals you might find anywhere else, and you have our word for that.
            Let's have you join us!
        </p>
      </div>

      <div className='form-group'>
        <div className='section'>
          <div className='form-input-group'>
            <label> Full Name </label>
            <input className='type-input' type='text'/>
          </div>

          <div className='form-input-group type-2'>
            <label> Email </label>
            <input className='type-input' type='text' />
          </div>
        </div>

        <div className='section'>
          <div className='form-input-group'>
            <label> Password </label>
            <input className='type-input' type='password'/>
          </div>

          <div className='form-input-group type-2'>
            <label> Confirm Password </label>
            <input className='type-input' type='password'/>
          </div>
        </div>

        <div className='submit-button' onclick="window.location.href='catalogue.html'">
          Sign Up
        </div>
        <p className='got-an-account-id' onclick='changeDetails()'> I already have an account </p>
      </div>
  </div>
)

export default LoginFormComponent;
