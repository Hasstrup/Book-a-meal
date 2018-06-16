import React from 'react';
import renderer from 'react-test-renderer';
import AuthComponent from '../../../modules/home/components/auth'


describe('Auth component', () => {
  it('should match this snapshot', () => {
    const tree = renderer.create(<div> Hello</div>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
