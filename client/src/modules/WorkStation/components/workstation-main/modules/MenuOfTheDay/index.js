import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuOfTheDay, { nameInput, descriptionInput } from './components/MenuOfTheDay';
import { DispatchNotification } from '../../../../../../actionTypes/misc';
import { SetMenuOfTheDay } from '../../../../../../actions/menus';
import BlackList from './utils';
import MealSelectModal from './components/SelectMealModal';
import { makeEditable } from '../../../../../../mixins/cards/singleMeal/utils';

const defaultImageUrl = 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c75e0437e819afdceeb3050a6bcdd71b&auto=format&fit=crop&w=653&q=80';
let counter = 0;

class MenuOfTheDayContainer extends Component {
  state = {
    buttonText: 'Change',
    wantsToEdit: false,
    selectedMealsForMenuOfTheDay: [],
    previewImage: defaultImageUrl
  }

  componentDidUpdate = (prevProps) => {
    const { ofTheDay } = prevProps;
    // that means the meals have arrived || accounting for some latency in event cycle;
    if (!ofTheDay) return this.generateImageFromMenuOfTheDay();
  }

  handlePress = () => {
    if (!this.state.wantsToEdit) { // all of this code should run when the
      makeEditable(1, 'motd-name', 'motd-desc');
      this.props.dispatch({ type: 'MENU_OF_THE_DAY' }); // should reset the menu of the day here;
      return this.setState({ buttonText: 'Save', wantsToEdit: true });

    }
    const name = nameInput.current.innerText || '';
    const description = descriptionInput.current.innerText || '';
    if (!this.validateMenuInput({ name, description })) return this.props.dispatch(DispatchNotification('Please fill in the name and description'));
    const { selectedMealsForMenuOfTheDay } = this.state;
    if (!selectedMealsForMenuOfTheDay.length) return this.props.dispatch(DispatchNotification('Please select some meals'));
    this.props.dispatch(SetMenuOfTheDay({ name, description, meals: selectedMealsForMenuOfTheDay }));
    return this.setState({ buttonText: 'Change', wantsToEdit: false });
  }

  validateMenuInput = (args) => {
    if (!args) return false;
    return Object.values(args).reduce((accumulator, item) => {
      if (!item.length || BlackList.includes(item)) {
        accumulator = false;
      }
      return accumulator;
    }, true);
  }

  generateImageFromMenuOfTheDay = () => {
    const { ofTheDay } = this.props;
    if(!ofTheDay) return;
    this.generatePreviewImage({ selectedMealsForMenuOfTheDay: ofTheDay.Meals });
  }

  handleSelect = (meal) => {
    const { selectedMealsForMenuOfTheDay } = this.state;
    const mappedMenu = selectedMealsForMenuOfTheDay.map(item => item.id);
    if (!mappedMenu.includes(meal.id)) {
      this.setState({ selectedMealsForMenuOfTheDay: [meal, ...selectedMealsForMenuOfTheDay] });
    } else {
      this.setState({ selectedMealsForMenuOfTheDay: selectedMealsForMenuOfTheDay.filter(item => item.id !== meal.id) });
    }
    return this.generatePreviewImage();
  }

  generatePreviewImage = (args) => {
    const { selectedMealsForMenuOfTheDay } = args || this.state;
    if (!selectedMealsForMenuOfTheDay.length) return this.setState({ previewImage: defaultImageUrl });
    // generate a random image
    const index = Math.floor(Math.random() * selectedMealsForMenuOfTheDay.length);
    if (selectedMealsForMenuOfTheDay[index].image) return this.setState({ previewImage: selectedMealsForMenuOfTheDay[index].image });
    // recursively try to generate an image, hopefully no infinite loops
    // We've gone through every item in the selected meals and no image :( set the default url then
    if (counter === selectedMealsForMenuOfTheDay.length) return this.setState({ previewImage: defaultImageUrl });
    counter += 1;
    return args ? this.generatePreviewImage(args) : this.generatePreviewImage();
  }

  render = () => (
    <div>
      <MenuOfTheDay
        buttonText={this.state.buttonText}
        handleClick={this.handlePress}
        previewImage={this.state.previewImage}
        ofTheDay={this.props.ofTheDay}
        openModal={() => { this.setState({ renderModal: true }); }}
      />
      <MealSelectModal
        meals={this.props.meals}
        isVisible={this.state.renderModal}
        selectedMeals={this.state.selectedMealsForMenuOfTheDay.map(item => item.id)}
        closeModal={() => { this.setState({ renderModal: false }); }}
        handleSelect={this.handleSelect}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  meals: state.meals.belongsToUser,
  ofTheDay: state.menus.ofTheDay
});

export default connect(mapStateToProps)(MenuOfTheDayContainer);
