import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import { Provider } from 'react-redux';
import { SingleMealCardContainer } from '../../../mixins/cards/singleMeal';
import * as CartActions from '../../../actions/orders';
import defaultProps from '../../helpers';
import { RenderMenuContainer, MenuPage } from '../../../modules/ShowMenu';

let wrapper;
const OrderStub = stub(CartActions, 'AddToCart');
OrderStub.returns(() => {});
const dispatchSpy = spy(defaultProps, 'dispatch');
const menu = {
  name: 'Test Menu',
  description: 'This is a test menu',
  kitchen: {
    name: 'This is great',
    description: 'This is my test menu',
    id: 3
  },
  meals: [{
    name: 'This is a menu',
    description: '',
    price: 5000,
    kitchenId: 2
  }]
};

describe('Show Menu Page', () => {
  afterAll(() => {
    OrderStub.restore();
  });
  it('should match snapshot', () => {
    wrapper = shallow(<RenderMenuContainer {...defaultProps} menu={menu} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have two children on shallow render', async () => {
    await wrapper.instance().setState({ menu });
    expect(wrapper.find(MenuPage)).toHaveLength(1);
  });

  describe('should render menu received as props', () => {
    beforeAll(async () => {
      wrapper = await mount(<Provider store={{ ...defaultProps, subscribe: () => {}, getState: () => {} }}>
        <RenderMenuContainer menus={menu} {...defaultProps} />
                            </Provider>);
    });

    it('should match snashot', async () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe('Single Meal Card Component', () => {
      beforeAll(async () => {
        wrapper = await mount(<SingleMealCardContainer {...defaultProps} meal={menu.meals[0]} kitchen={menu.kitchen} renderEditable={false} />);
      });

      it('should match UI Snapshot ', async () => {
        expect(wrapper).toMatchSnapshot();
      });

      it('should make a call to add to cart after the order button is clicked', () => {
        wrapper.find('.option-options').first().simulate('click');
        expect(OrderStub.called).toEqual(true);
        expect(dispatchSpy.called).toEqual(true);
      });
    });
  });
});
