import React, { Component } from 'react';
import { connect } from 'react-redux';
import RenderWorkStationMain from './components/workstation-main';
import RenderKitchenAndUserBio from './components/UserBio';
import '../styles/profile.scss';
import { FetchUser } from '../../actions/users';
import { ProcessIndicatorLg } from '../../mixins/ProcessIndicator';
import KitchenActions from '../../actions/kitchens';


class WorkStationContainer extends Component {
   componentDidMount = () => {
     if (!this.props.user) return this.props.dispatch(FetchUser());
   }

   handleChange = (e, name) => {
     console.log(name);
     console.log(e.target.value)
     this.setState({ [name]: e.target.value })
   }
   
   handleSubmit = (key) => {
     switch (key) {
       case 1:
         const { SetUpNewKitchen } = KitchenActions;
         return this.props.dispatch(SetUpNewKitchen({ name: this.state.name, description: this.state.description }));

       default:
         return null;
     }
   }
    render = () => (
      <div>
        { this.props.user ?
          <div className="main-profile-body">
            <RenderKitchenAndUserBio user={this.props.user} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            <RenderWorkStationMain />
          </div>
        : <ProcessIndicatorLg />
      }
      </div>
    )
}

const mapStateToProps = state => ({
  user: state.users.target
});

export default connect(mapStateToProps)(WorkStationContainer);
