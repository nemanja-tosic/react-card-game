// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { Card } from '../models/card';
import { TestCards } from '../test/support/test-cards';
import CardComponent from './Card';

describe('Card', () => {
  let component;
  let spy;
  let cardRefSpy;

  const card: Card = TestCards.create();

  beforeEach(() => {
    spy = jest.fn();
    cardRefSpy = jest.fn();
    component = shallow(<CardComponent card={card} onClick={spy} cardRef={cardRefSpy}/>);
  });

  describe('when the faceDown prop is true', () => {
    beforeEach(() => {
      component.setProps({faceDown: true});
    });

    describe('and the orientation is landscape', () => {
      it('should display the face down card image in the landscape orientation', () => {
        component.setProps({orientation: 'landscape'});

        expect(component.getNode()).toMatchSnapshot();
      });
    });

    describe('and the orientation is portrait', () => {
      it('should display the face down card image in the portrait orientation', () => {
        component.setProps({orientation: 'portrait'});

        expect(component.getNode()).toMatchSnapshot();
      });
    });

    describe('and the orientation is not provided', () => {
      it('should display the face down card image in the portrait orientation', () => {
        expect(component.getNode()).toMatchSnapshot();
      });
    });
  });

  describe('when the faceDown prop is false', () => {
    beforeEach(() => {
      component.setProps({faceDown: false});
    });

    it('should display the card image', () => {
      expect(component.getNode()).toMatchSnapshot();
    });
  });

  describe('when the card is clicked', () => {
    it('should call the onClick prop if present', () => {
      component.first().simulate('click');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClick prop if not present', () => {
      component.setProps({onClick: undefined});

      component.first().simulate('click');

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
