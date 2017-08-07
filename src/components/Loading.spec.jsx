// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('Loading', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Loading message="some message" />);
  });

  it('should show the loading animation and the message', () => {
    expect(component.getNode()).toMatchSnapshot();
  });
});
