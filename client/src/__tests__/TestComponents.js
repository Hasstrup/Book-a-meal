import { shallow } from 'enzyme';
import React from 'react';

let wrapper;

export default (ComponentsList, NameList, PropsList, title) => describe(`${title}`, () => {
  for (let i = 0; i < ComponentsList.length; i += 1) {
    it(`${NameList[i]} should render correctly on shallow render`, async () => {
      // doing this so that it blocks; God help me with this Lol.
      wrapper = await shallow(React.createElement(ComponentsList[i], PropsList[i], null));
      expect(wrapper).toMatchSnapshot();
    });
  }
});
