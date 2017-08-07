// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { TestCards } from '../test/support/test-cards';
import Talon from './Talon';
import CardComponent from './Card';

describe('Talon', () => {
  let component;
  let cardRefSpy;

  const cards = [TestCards.create()];

  beforeEach(() => {
    cardRefSpy = jest.fn();

    component = shallow(<Talon cards={cards} cardRef={cardRefSpy}/>)
  });

  it('should display all the provided cards', () => {
    expect(component.getNode()).toMatchSnapshot();
  });

  it('should call the cardRef prop when a card ref is updated', () => {
    const cardComponent = component.find(CardComponent).at(0);
    const tracer = {};

    cardComponent.prop('cardRef')(tracer);

    expect(cardRefSpy).toHaveBeenCalledWith(tracer)
  });
});
