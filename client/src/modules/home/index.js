import React, { Component } from 'react';
import '../styles/index.scss'
import AnimatingBannerComponent from './components/banner'
import ImageFloatingComponent from './components/floater'
import LoginFormComponent from './components/auth'
/* eslint-disable */

const HomeComponent = () => (
  <div>
  <AnimatingBannerComponent />
  <ImageFloatingComponent />
  <LoginFormComponent  />
  </div>
)





export default HomeComponent;
