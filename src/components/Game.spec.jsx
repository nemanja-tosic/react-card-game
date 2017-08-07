// @flow
import React from 'react';
import { shallow } from 'enzyme';

import { TestGame } from '../test/support/test-game';
import GameComponent from './Game';
import TalonComponent from './Talon';

describe('Game', () => {
  let component;
  let onCardClickedSpy;
  let playerComponent;
  let talonComponent;
  let game;

  beforeEach(() => {
    game = TestGame.create();
    onCardClickedSpy = jest.fn();
    component = shallow(
      <GameComponent game={game} onCardClicked={onCardClickedSpy}/>,
      {lifecycleExperimental: true}
    );
    talonComponent = component.find(TalonComponent);
    playerComponent = component.find('PlayerComponent');
  });

  it('should render correctly', () => {
    expect(component.getNode()).toMatchSnapshot();
  });

  describe('when the game updates', () => {
    let cardDomNode;

    beforeEach(() => {
      cardDomNode = {
        getBoundingClientRect: jest.fn()
          .mockReturnValueOnce({left: 0, top: 0, width: 100, height: 100})
          .mockReturnValueOnce({left: 20, top: 30, width: 0, height: 0}),
        animate: jest.fn(),
      };
    });

    it('should FLIP animate the cards', () => {
      const playedCard = game.players[0].cards.splice(0, 1)[0];
      game.talon = [playedCard];
      playerComponent.prop('cardRef')('JS', cardDomNode);
      talonComponent.prop('cardRef')('JS', cardDomNode);

      component.setProps({game});

      expect(cardDomNode.animate).toHaveBeenCalledWith({
        transform: ['translate(-20px, -30px) scale(1000, 1000)', 'translate(0, 0) scale(1, 1)'],
      }, expect.anything());
    });
  });
});
