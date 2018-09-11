import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import LoginFormComponent from '../../../modules/home/components/auth';
import ImageFloatingComponent from '../../../modules/home/components/floater';
import AnimatingBannerComponent from '../../../modules/home/components/banner';
import { HomeComponent } from '../../../modules/home/';


let wrapper;

// describe('Home component', () => {
//   // Component testing here
//   it('Should have three children on shallow render', () => {
//     wrapper = shallow(<HomeComponent />);
//     expect(wrapper.find(LoginFormComponent)).to.have.length(1)
//     expect(wrapper.find(ImageFloatingComponent)).to.have.length(1); 
//     expect(wrapper.find(AnimatingBannerComponent)).to.have.length(1);
//   });

//   describe('Login/Sign Up Form Form Component', () => {
//     beforeAll(() => {
//       wrapper = mount(<LoginFormComponent />)
//     })
//     it('should render the form correctly and have only the ', () => {
     
//       expect(wrapper.find('input').length).to.equal(4); 
//       expect(wrapper.find('.submit-button').length).to.equal(1)
//     });

//     it('Should render only the login form after the click', () => {
//       wrapper.find('.got-an-account-id')[0].simulate('click'); 
//       expect(wrapper.find('input').length).to.equal(2)
//     });
//   });
// });
