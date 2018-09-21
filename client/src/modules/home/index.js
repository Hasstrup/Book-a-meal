import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/index.scss';
import AnimatingBannerComponent from './components/banner';
import ImageFloatingComponent from './components/floater';
import LoginFormComponent from './components/auth';
import { SignUpUser, LogInUser, GetLoggedInUser } from '../../actions/users/';
/* eslint-disable */


export class HomeContainer extends Component {
  constructor(props) {
    super(props);
    if(this.props.user) return this.props.history.push('/catalogue');
    
  }
  componentDidMount = () => {
    GetLoggedInUser();
  }
  
  render = () => (<HomeComponent history={this.props.history} dispatch={this.props.dispatch} />)
}

export const HomeComponent = ({ history, dispatch }) => (
  <div>
  <AnimatingBannerComponent />
  <LoginFormComponent logInUser={(body) => dispatch(LogInUser(body)(history))} createUser={(body) => dispatch(SignUpUser(body)(history))}/>
  </div>
)

const mapStateToProps = (state) => ({
    user: state.users.current
})

export default connect(mapStateToProps)(HomeContainer);
