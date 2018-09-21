import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editMealInformation, deleteMeal } from '../../../actions/meals/';
import { StartProcess } from '../../../actionTypes/misc';
import { makeEditable, getMealInformation } from './utils';
import SingleMealCard from './components';
import SendToCloudinary from '../../../actions/helpers/cloudinaryProcessor';

export class SingleMealCardContainer extends Component {
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
  handleDelete = () => this.props.dispatch(deleteMeal(this.props.meal.id)); // TODO: You might want to add some checks here

  /**
   * @name handleEdit
   * @description edits the current meal, also renders the form dynamically based on the state;
   * @returns {null}
   * @private
   */
  handleEdit = () => {
    // the user is just editing
    if (!this.state.wantsToEdit) {
      makeEditable(1, `editable${this.props.meal.id}`);
      return this.setState({ displayText: 'Save', wantsToEdit: true });
    }
    makeEditable(2, `editable${this.props.meal.id}`, 2);
    const { name, image, description } = getMealInformation(this.props.meal.id);
    if (!image) {
      // this means the user did not set a new image;
      this.props.dispatch(editMealInformation(this.props.meal.id)({ name, description }));
    } else {
      this.props.dispatch(StartProcess());
      SendToCloudinary(image)
        .then((url) => {
        // cloudinary starts;
          this.props.dispatch(editMealInformation(this.props.meal.id)({ name, description, image: url }));
        });
    }
    this.setState({ displayText: 'Modify', wantsToEdit: false });
  }

  render = () => (<SingleMealCard
    meal={this.props.meal}
    dispatch={this.props.dispatch}
    kitchen={this.props.kitchen}
    handleDelete={this.handleDelete}
    handleEdit={this.handleEdit}
    displayText={this.state.displayText}
    wantsToEdit={this.state.wantsToEdit}
    renderEditable={this.props.renderEditable}
  />)
}

// Card Component> TODO: will it be an to overkill to refactor into single file?

const mapStateToProps = state => ({
  kitchen: state.kitchens.target
});

export default connect(mapStateToProps)(SingleMealCardContainer);
