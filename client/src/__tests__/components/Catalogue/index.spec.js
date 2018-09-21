import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { SingleMenuCard } from '../../../mixins/cards/singleMenu';
import defaultProps from '../../helpers';
import { Catalogue, CatalogueFirstRow, CatalogueGridMain } from '../../../modules/catalogue/';

let wrapper;
const historySpy = spy(defaultProps.history, 'push');
const dispatchSpy = spy(defaultProps, 'dispatch');
const menu = {
  name: 'Test Menu',
  description: 'This is a test menu',
  kitchen: {
    name: 'This is great',
    description: 'This is my test menu'
  },
  meals: [{
    name: 'This is a menu',
    description: '',
    price: 5000
  }]
};

describe('Catalogue page', () => {
  it('should match snapshot', () => {
    wrapper = shallow(<Catalogue {...defaultProps} menus={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have two children on shallow render', () => {
    expect(wrapper.find(CatalogueFirstRow)).toHaveLength(1);
    expect(wrapper.find(CatalogueGridMain)).toHaveLength(1);
  });

  describe('should render an empty route with no menus in the catalogue (deep render)', () => {
    beforeAll(() => {
      wrapper = mount(<Catalogue menus={[]} {...defaultProps} />);
    });

    it('should render an empty page with no menus in catalogue', () => {
      expect(wrapper.find('.introductory-grid')).toHaveLength(1);
      expect(wrapper.find('.render-empty-component')).toHaveLength(1);
      expect(wrapper.find('.hoverable-item')).toHaveLength(1);
    });

    it('should go to the navigation page when the user clicks the do something button', () => {
      const node = wrapper.find('.hoverable-item').first();
      node.simulate('click');
      expect(historySpy.calledWith('/profile')).toEqual(true);
      expect(dispatchSpy.called).toEqual(true);
    });

    describe('Catalogue component with hydrated data', () => {
      it('should render equal number of menu cards passed in as props', async () => {
        wrapper = await mount(<Catalogue menus={[menu, menu, menu]} {...defaultProps} />);
        expect(wrapper.find('.menu-item')).toHaveLength(3);
      });
    });
  });

  describe('Catalogue first row components', () => {
    beforeAll(() => {
      wrapper = mount(<CatalogueFirstRow logInUser={() => {}} createUser={() => {}} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Animating Banner Component', () => {
    beforeAll(() => {
      wrapper = mount(<CatalogueGridMain determineRenderBy={[]} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Single Menu Card', () => {
    beforeAll(async () => {
      wrapper = await mount(<SingleMenuCard {...defaultProps} data={menu} />);
    });
    it('should match snapshot with the data in place', async () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should make call to the dispatch when there is some data in place', () => {
      wrapper.find('.menu-item').first().simulate('click');
      expect(dispatchSpy.called).toEqual(true);
    });
  });
});
