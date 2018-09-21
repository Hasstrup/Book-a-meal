import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import defaultProps from '../../helpers';
import { WorkStationContainer } from '../../../modules/WorkStation';

let wrapper;
const menu = {
  name: 'Test Menu',
  description: 'This is a test menu',
  kitchen: {
    name: 'This is great',
    description: 'This is my test menu',
    id: 3,
    MenuofTheDay: null
  },
  meals: [{
    name: 'This is a menu',
    description: '',
    price: 5000,
    kitchenId: 2
  }]
};

const user = {
  firstname: 'Hasstru',
  lastname: 'Ezekiel',
  email: 'hass@mail.com',
  kitchen: menu.kitchen
};
describe('WorkStation Container', () => {
  it('should match snapshot on shallow render', () => {
    wrapper = shallow(<WorkStationContainer {...defaultProps} user={user} kitchen={menu.kitchen} meals={menu.meals} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Workstation methods', () => {
    it('validMealInput should return true or false for a valid meal input', () => {
      const meal = { name: 'Test Meal', description: 'description123', price: 200, };
      const { validMealInput } = wrapper.instance();
      expect(validMealInput(meal)).toEqual(true);
      meal.price = 'string';
      expect(validMealInput(meal)).toEqual(false);
    });

    it('handleSubmit should render the right forms based on the key passed', () => {
      const { handleSubmit } = wrapper.instance();
      const KitchenStub = stub(wrapper.instance(), 'handleNewKitchen');
      const MealStub = stub(wrapper.instance(), 'handleNewMeal');
      handleSubmit(1);
      expect(KitchenStub.called).toEqual(true);
      handleSubmit(2);
      expect(MealStub.called).toEqual(true);
      KitchenStub.restore();
      MealStub.restore();
    });
  });

  it('handleNewMeal should show the render meal form', () => {
    const { handleNewMeal } = wrapper.instance();
    handleNewMeal();
    expect(wrapper.instance().state.wantsToAddMeal).toEqual(true);
  });

  it('should render successfully on deep mounting', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
