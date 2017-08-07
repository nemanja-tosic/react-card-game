// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { TestGame } from '../test/support/test-game';
import Scores from './Scores';
import { TestPlayer } from '../test/support/test-player';

describe('Scores', () => {
  let component;
  let onNewGameSpy;
  let game;

  beforeEach(() => {
    game = TestGame.create({
      players: [
        TestPlayer.create({name: 'John'}),
        TestPlayer.create({name: 'HAL'}),
      ]
    });
    onNewGameSpy = jest.fn();
    component = shallow(<Scores game={game} onNewGame={onNewGameSpy}/>);
  });

  describe('when there is a single winner', () => {
    it('should indicate the winner', () => {
      game.winners = [game.players[0]];

      component.setProps({game});

      expect(component.getNode()).toMatchSnapshot();
    });
  });

  describe('when there are multiple winners', () => {
    it('should highlight all the winners', () => {
      game.winners = [...game.players];

      component.setProps({game});

      expect(component.getNode()).toMatchSnapshot();
    });
  });

  it('should call the onNewGame prop when the new game button is clicked', () => {
    component.find('button').simulate('click');

    expect(onNewGameSpy).toHaveBeenCalledTimes(1);
  });
});
