import React from 'react';
import { connect } from 'react-redux';
import '../styles/index.scss';
import AnimatingBannerComponent from './components/banner';
import ImageFloatingComponent from './components/floater';
import LoginFormComponent from './components/auth';
import { SignUpUser, LogInUser } from '../../actions/users/';
/* eslint-disable */


export const HomeComponent = ({ history, createUser, dispatch }) => (
  <div>
  <AnimatingBannerComponent />
  <ImageFloatingComponent />
  <LoginFormComponent logInUser={(body) => dispatch(LogInUser(body)(history))} createUser={(body) => dispatch(SignUpUser(body)(history))}/>
  </div>
)



export default connect()(HomeComponent);
