import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../src/components/App';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('renders', () => {
    expect(wrapper).to.exist;
  });
});
