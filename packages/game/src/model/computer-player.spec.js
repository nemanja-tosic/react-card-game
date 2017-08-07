// @flow
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Game } from './game';
import { ComputerPlayer } from './computer-player';
import { TestCards } from '../../test/support/test-cards';

describe('ComputerPlayer', () => {
  let gameMock;
  let player: ComputerPlayer;
  let cards = TestCards.createHand();

  beforeEach(() => {
    gameMock = sinon.mock(Object.create(Game.prototype));

    player = new ComputerPlayer(0, '', gameMock.object);
    player.cards = cards;
  });

  describe('#setState(state)', () => {
    describe('when transitioning to the active state', () => {
      it('should play a random card from its deck after a 1s timeout', () => {
        const clock = sinon.useFakeTimers();
        const randomStub = sinon.stub(Math, 'random', () => 0);
        gameMock
          .expects('addCardToTalon')
          .withArgs(player, cards[0]);

        player.setState('active');
        clock.tick(1000);

        expect(player.state).to.equal('active');
        randomStub.restore();
        gameMock.verify();
      });
    });
  });
});
