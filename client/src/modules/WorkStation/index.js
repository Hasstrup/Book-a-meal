import React, { Component } from 'react';
import RenderWorkStationMain from './components/workstation-main';
import RenderKitchenAndUserBio from './components/UserBio';
import '../styles/profile.scss';


export default class WorkStationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    render = () => (
      <div className="main-profile-body">
        <RenderKitchenAndUserBio />
        <RenderWorkStationMain />
      </div>
    )
}
