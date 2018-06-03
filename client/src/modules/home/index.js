import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../styles/index.scss'
import AnimatingBannerComponent from './components/banner'
import ImageFloatingComponent from './components/floater'
import LoginFormComponent from './components/auth'
import { SignUpUser } from '../../actions/users/'
/* eslint-disable */

const HomeComponent = ({ history, createUser }) => (
  <div>
  <AnimatingBannerComponent />
  <ImageFloatingComponent />
  <LoginFormComponent  history={history} newUser={(body) => createUser(body, history)}/>
  </div>
)


const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (body, history) => dispatch(SignUpUser(body, history))
  }
};



export default connect(mapDispatchToProps)(HomeComponent);
