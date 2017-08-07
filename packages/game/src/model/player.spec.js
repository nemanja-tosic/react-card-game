// @flow
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Player } from './player';
import { TestCards } from '../../test/support/test-cards';
import { Game } from './game';

describe('Player', () => {
  let player: Player;
  let gameMock;
  let cards;

  beforeEach(() => {
    gameMock = sinon.mock(Object.create(Game.prototype));
    cards = TestCards.createHand();

    player = new Player(0, '', gameMock.object);
    player.cards = cards;
  });

  it('should initially have the score set to 0', () => {
    expect(player.score).to.equal(0);
  });

  it('should initially be in the inactive state', () => {
    expect(player.state).to.equal('inactive');
  });

  describe('#playCard(card)', () => {
    describe('when the player is not active', () => {
      it('should throw an error', () => {
        expect(() => player.playCard(0)).to.throw();
      });
    });

    describe('when the player is active', () => {
      beforeEach(() => {
        player.state = 'active';
      });

      it('should remove the played card from the players hand', () => {
        const playedCard = cards[0];
        gameMock.expects('addCardToTalon')

        player.playCard(0);

        expect(player.cards).not.to.contain(playedCard);
      });

      it('should add the card to the game talon', () => {
        gameMock
          .expects('addCardToTalon')
          .withArgs(player, cards[0]);

        player.playCard(0);

        gameMock.verify();
      });
    });
  });

  describe('#takeCards(cards)', () => {
    const cards = [
      TestCards.create({value: 1}),
      TestCards.create({value: 2}),
    ];

    it('should update the players score by adding the sum of the card values', () => {
      player.takeCards(cards);

      expect(player.score).to.equal(3);
    });

    it('should update the taken cards array, grouping the cards taken together', () => {
      player.takeCards(cards);

      expect(player.takenCards[0]).to.deep.equal(cards);
    });
  });
});
