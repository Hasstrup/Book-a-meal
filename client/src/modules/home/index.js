import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/index.scss';
import AnimatingBannerComponent from './components/banner';
import ImageFloatingComponent from './components/floater';
import LoginFormComponent from './components/auth';
import { SignUpUser, LogInUser, checkForLoggedInUser } from '../../actions/users/';
/* eslint-disable */


class HomeContainer extends Component {
  componentDidMount = () => {
    this.props.dispatch(checkForLoggedInUser())
  }
  
  render = () => (<HomeComponent history={this.props.history} dispatch={this.props.dispatch} />)
}

const HomeComponent = ({ history, dispatch }) => (
  <div>
  <AnimatingBannerComponent />
  <ImageFloatingComponent />
  <LoginFormComponent logInUser={(body) => dispatch(LogInUser(body)(history))} createUser={(body) => dispatch(SignUpUser(body)(history))}/>
  </div>
)



export default connect()(HomeContainer);
