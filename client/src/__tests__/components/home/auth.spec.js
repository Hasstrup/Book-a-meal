import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import LoginFormComponent from '../../../modules/home/components/auth';
import ImageFloatingComponent from '../../../modules/home/components/floater';
import AnimatingBannerComponent from '../../../modules/home/components/banner';
import { HomeComponent } from '../../../modules/home/';


let wrapper;

describe('Home component', () => {
  // Component testing here
  it('should match snapshot user', () => {
    wrapper = shallow(<HomeComponent />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should have three children on shallow render', () => {
    expect(wrapper.find(LoginFormComponent)).toHaveLength(1);
    expect(wrapper.find(AnimatingBannerComponent)).toHaveLength(1);
  });

  describe('Login/Sign Up Form Form Component', () => {
    beforeAll(() => {
      wrapper = mount(<LoginFormComponent logInUser={() => {}} createUser={() => {}} />);
    });
    it('should render the form correctly and have only the ', () => {
      expect(wrapper.find('input').length).toEqual(4);
      expect(wrapper.find('.submit-button').length).toEqual(1);
    });

    it('Should render only the login form after the click', () => {
      wrapper.find('.got-an-account-id').first().simulate('click');
      expect(wrapper.find('input').length).toEqual(2);
    });
  });

  describe('Image FLoating Component', () => {
    beforeAll(() => {
      wrapper = mount(<ImageFloatingComponent logInUser={() => {}} createUser={() => {}} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Animating Banner Component', () => {
    beforeAll(() => {
      wrapper = mount(<AnimatingBannerComponent logInUser={() => {}} createUser={() => {}} />);
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
