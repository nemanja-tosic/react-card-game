// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Menu from './Menu';

describe('Menu', () => {
  let component;
  let startGameSpy;

  beforeEach(() => {
    startGameSpy = jest.fn();
    component = shallow(<Menu onStartGame={startGameSpy}/>);
  });

  it('should show a form with entries for the player name and the number of opponents', () => {
    expect(component.getNode()).toMatchSnapshot();
  });

  describe('when the start game button is clicked', () => {
    describe('and the form is valid', () => {
      it('should call the onStartGame prop with the entered details', () => {
        const name = 'my name';
        const numberOfOpponents = 3;
        const nameInput = component.find('.Menu__name input');
        const numberOfOpponentsDropdown = component.find('.Menu__number-of-opponents select');
        const form = component.find('form');

        nameInput.simulate('change', {
          currentTarget: {
            value: name,
            validity: {
              patternMismatch: false,
            },
            setCustomValidity: () => {
            }
          },
        });
        numberOfOpponentsDropdown.simulate('change', {
          currentTarget: {
            value: numberOfOpponents,
          },
        });
        form.simulate('submit', {
          preventDefault: () => {
          },
        });

        expect(startGameSpy).toHaveBeenCalledWith(name, numberOfOpponents);
      });
    });
  });
});
