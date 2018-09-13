import React from 'react';
import { shallow } from 'enzyme';
import { stub, spy } from 'sinon';
import defaultProps from '../../helpers';
import { OrderHistoryPage } from '../../../modules/ShowOrders';
import RenderActualHistory from '../../../modules/ShowOrders/components/RenderMainHistory';
import OrderHistoryHeader from '../../../modules/ShowOrders/components/OrderHistoryHeader';

let wrapper;
const dispatchSpy = spy(defaultProps, 'dispatch');

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

const orders = {
  1: [{ meal: 1 }]
};

const user = {
  firstname: 'Hasstru',
  lastname: 'Ezekiel',
  email: 'hass@mail.com',
  kitchen: menu.kitchen,
  id: 1
};

describe('Order History Page', () => {
  it('should match snapshot on shallow render', () => {
    wrapper = shallow(<OrderHistoryPage orders={orders} {...defaultProps} user={user} kitchen={menu.kitchen} meals={menu.meals} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain two children on shallow render', () => {
    expect(wrapper.find(RenderActualHistory)).toHaveLength(1);
    expect(wrapper.find(OrderHistoryHeader)).toHaveLength(1);
  });

  describe('Order History methods', () => {
    it('Change target should change the orders currently in view', () => {
      const { changeTarget, state } = wrapper.instance();
      changeTarget(user);
      expect(dispatchSpy.called).toEqual(true);
      expect(state.target.id).toEqual(1);
      expect(state.ordersInView[0].meal).toEqual(1);
    });
  });

  it('should render successfully on deep mounting', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
