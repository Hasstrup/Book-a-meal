import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editMealInformation , deleteMeal } from '../../../actions/meals/';
import { makeEditable, getMealInformation } from './utils';

import { HideMealCard } from '../../../modules/WorkStation/utils';

const defaultUrl = 'https://images.unsplash.com/photo-1453831362806-3d5577f014a4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9dd8da96be0724ab84e4147d428f6bba&auto=format&fit=crop&w=500&q=60';
/**
 * 
 * @param {*} param0 
 */
const SingleMealCard = ({ meal, kitchen, handleDelete, handleEdit, displayText, wantsToEdit }) => (
  <div className="display-menu-item" id={meal.id} onMouseLeave={() => { HideMealCard(meal.id); }}>
    <div className="order-add-item">
      <img src={meal.image || defaultUrl} alt={meal.name} id={`image-${meal.id}`} className="main-meal-item-img" />
      <div className={`change-preview-image modifiable${meal.id}`} style={{ opacity: wantsToEdit ? 1 : 0, zIndex: wantsToEdit ? 5 : -1 }}>
        <p className="label-for-input"> Click to change Image </p>
        <input type="file" className={`input-file image-${meal.id}`} name="input-file" onChange="changePhoto('image-1')" accept=".jpg, .png, .jpeg" />
      </div>
    </div>
    <div className="item-details">
      <div className="item-title-and-description">
        <p className={`item-title-main editable editable${meal.id}`}> {meal.name || ''} </p>
        <p className={`item-description editable editable${meal.id}`}> {meal.description || ''} </p>
      </div>
      <div className="buttons-array-and-togglers">
        {
        kitchen && kitchen.id === meal.KitchenId ?
          <p className="option-options"> <span className="edit-meal-option" onClick={handleEdit} id={`target${meal.id}`}> {displayText} </span> { wantsToEdit ? null : <span className="delete-meal-option" onClick={handleDelete}> Delete </span> } </p>
        : <p className="option-options"> Place an order </p>
      }

        <p className="option-options2" > N{meal.price} </p>
      </div>
    </div>
  </div>
);

class SingleMealCardContainer extends Component {
  state = {
    wantsToEdit: false,
    displayText: 'Modify'
  };
  /**
   * @description deletes the meal belonging to the user
   * @returns {null}
   * @name handleDelete
   * @private
   */
  handleDelete = () => this.props.dispatch(deleteMeal(this.props.meal.id)); //TODO: You might want to add some checks here
  
  handleEdit = () => {
    // the user is just editing 
    if (!this.state.wantsToEdit) {
      makeEditable(`editable${this.props.meal.id}`, 1);
      return this.setState({ displayText: 'Save', wantsToEdit: true });
      // also change the image;
    }
  }

  render = () => <SingleMealCard 
  meal={this.props.meal} 
  kithen={this.props.kitchen} 
  handleDelete={this.handleDelete} 
  handleEdit={this.handleEdit} 
  displayText={this.state.displayText}
  wantsToEdit={this.state.wantsToEdit}
  />
}

const mapStateToProps = state => ({
  kitchen: state.kitchens.target
});

export default connect(mapStateToProps)(SingleMealCardContainer);
