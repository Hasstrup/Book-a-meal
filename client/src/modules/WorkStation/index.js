import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DispatchNotification } from '../../actionTypes/misc';
import RenderWorkStationMain from './components/workstation-main';
import RenderKitchenAndUserBio from './components/UserBio';
import '../styles/profile.scss';
import { FetchUser } from '../../actions/users';
import { ProcessIndicatorLg } from '../../mixins/ProcessIndicator';
import KitchenActions from '../../actions/kitchens';
import utils from './utils';

const { RenderMealForm, GetMealInformation } = utils;
const { SetUpNewKitchen } = KitchenActions;

class WorkStationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   componentDidMount = () => {
     if (!this.props.user) return this.props.dispatch(FetchUser());
   }


 handleSubmit = (key) => {
   switch (key) {
     case 1:
       return this.handleNewKitchen();

     case 2:
       return this.handleNewMeal();

     default:
       return null;
   }
 }

 // TODO: You might need to extract this so it's accessible to all your components
 validMealInput = (meal) => {
   const target = Object.values(meal);
   /* eslint-disable-next-line no-restricted-globals, radix */
   // doing this because you want a valid price
   const BlackList = ['Meal name', 'description', 'Price', ''];
   return target.reduce((acccumulator, currentValue) => {
     if (BlackList.includes(currentValue)) {
       acccumulator = false;
     }
     return acccumulator;
   }, true);
 }

 handleRenderMealForm = () => {
   RenderMealForm();
   this.state.wantsToAddKitchen = true; // doing this to avoid a rerender of the dom;
 }

 createNewMeal = (meal) => {

  if (isNaN(parseInt(meal.price))){
    this.props.dispatch(DispatchNotification('Please check that the price is a number'));
  } 
 }

 handleNewMeal = () => {
   if (!this.state.wantsToAddKitchen) return this.handleRenderMealForm();
   if (!this.validMealInput(GetMealInformation())) return this.props.dispatch(DispatchNotification(`Hey ${this.props.user.firstname}, you need to fill in every field, correctly too :)`));
   this.createNewMeal(GetMealInformation());
  }

   handleNewKitchen = () => {
     const NewKitchenName = document.getElementsByClassName('new-kitchen-d')[0].innerText;
     const NewKitchenDescription = document.getElementsByClassName('new-kitchen-d')[1].innerText;
     // check to make sure the value is not the placeholder and not empty;
     if (!NewKitchenName.length || !NewKitchenDescription.length || NewKitchenName === 'Kitchen Name' || NewKitchenDescription === 'Description') {
       return this.props.dispatch(DispatchNotification('Sorry, you need to fill in every field'));
     }
     return this.props.dispatch(SetUpNewKitchen({ name: NewKitchenName, description: NewKitchenDescription }));
   }


    render = () => (
      <div>
        { this.props.user ?
          <div className="main-profile-body">
            <RenderKitchenAndUserBio user={this.props.user} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            <RenderWorkStationMain kitchen={this.props.user.Kitchen} handleSubmit={this.handleSubmit} />
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
