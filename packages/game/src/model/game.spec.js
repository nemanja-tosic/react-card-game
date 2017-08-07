import * as sinon from 'sinon';
import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';

import { Player } from './player';
import { Game } from './game';
import { TestCards } from '../../test/support/test-cards';
import { CardService } from './card-service';

use(sinonChai);

describe('Game', () => {
  let game: Game;
  let cardServiceMock;
  let spy;

  let player1;
  let player2;
  let player3;

  beforeEach(() => {
    player1 = sinon.mock(Object.create(Player.prototype));
    player2 = sinon.mock(Object.create(Player.prototype));
    player3 = sinon.mock(Object.create(Player.prototype));
    cardServiceMock = sinon.mock(Object.create(CardService.prototype));
    spy = sinon.spy();

    game = new Game(cardServiceMock.object);
    game.players = [player1.object, player2.object, player3.object];
    game.attach(spy);
  });

  afterEach(() => {
    player1.verify();
    player2.verify();
    player3.verify();
  });

  describe('#talon', () => {
    it('should initially be empty', () => {
      expect(game.talon).to.deep.equal(new Map());
    });
  });

  describe('#start()', () => {
    it('should generate a new deck and deal the cards to the players', () => {
      const deckId = '1';
      const expectedCards = TestCards.createHand();
      cardServiceMock
        .expects('generateDeck')
        .returns(deckId);
      cardServiceMock
        .expects('draw')
        .exactly(3) // the number of players
        .returns(Promise.resolve(expectedCards));

      return game
        .start()
        .then(() => {
          expect(player1.object.cards).to.deep.equal(expectedCards);
          expect(player2.object.cards).to.deep.equal(expectedCards);
          expect(player3.object.cards).to.deep.equal(expectedCards);
        });
    });

    it('should set the first player as the active player', () => {
      cardServiceMock
        .expects('generateDeck')
        .returns(Promise.resolve());
      cardServiceMock
        .expects('draw')
        .exactly(3) // the number of players
        .returns(Promise.resolve([]));

      return game
        .start()
        .then(() => {
          expect(player1.object.state).to.equal('active');
        });
    });
  });

  describe('when a player plays a card', () => {
    const highCard = TestCards.create({value: 2});
    const card = TestCards.create({value: 1});

    it('should notify the observers', () => {
      const setStateSpy = player2
        .expects('setState')
        .withArgs('active');

      game.addCardToTalon(player1.object, card);

      expect(setStateSpy).to.have.been.calledBefore(spy);
      expect(spy).to.have.been.calledOnce;
    });

    it('should update the talon', () => {
      game.addCardToTalon(player1.object, card);

      expect(game.talon.get(player1.object)).to.equal(card);
    });

    describe('and the turn is done', () => {
      beforeEach(() => {
        // lazy evaluation - if player 1 hasn't played all cards, no need to check for anything else
        player1
          .expects('hasPlayedAllCards')
          .returns(false);
      });

      it('should notify the observers after a 1s delay', () => {
        const clock = sinon.useFakeTimers();
        player3.expects('takeCards');

        game.addCardToTalon(player1.object, card);
        game.addCardToTalon(player2.object, card);
        game.addCardToTalon(player3.object, card);
        clock.tick(1000);

        expect(spy).to.have.callCount(4);
      });

      describe('and there is a single high card', () => {
        it('should add the cards to the player who played the highest card', () => {
          const expectedScore = [card, highCard, card];
          player2
            .expects('takeCards')
            .withArgs(expectedScore);

          game.addCardToTalon(player1.object, card);
          game.addCardToTalon(player2.object, highCard);
          game.addCardToTalon(player3.object, card);
        });
      });

      describe('and there are two or more high cards', () => {
        it('should add the cards to the player who played the highest card last', () => {
          const expectedScore = [highCard, card, highCard];
          player3
            .expects('takeCards')
            .withArgs(expectedScore);

          game.addCardToTalon(player1.object, highCard);
          game.addCardToTalon(player2.object, card);
          game.addCardToTalon(player3.object, highCard);
        });
      });
    });

    describe('and the game is over', () => {
      beforeEach(() => {
        player1.expects('takeCards');
        player1
          .expects('hasPlayedAllCards')
          .returns(true);
        player2
          .expects('hasPlayedAllCards')
          .returns(true);
        player3
          .expects('hasPlayedAllCards')
          .returns(true);
      });

      describe('when there is only one high score', () => {
        it('should declare the winner based on the highest score', () => {
          player1.object.score = 1;
          player2.object.score = 3;
          player3.object.score = 2;

          game.addCardToTalon(player1.object, highCard);
          game.addCardToTalon(player2.object, card);
          game.addCardToTalon(player3.object, card);

          expect(game.state).to.equal('over');
          expect(game.winners).to.deep.equal([player2.object]);
        });
      });

      describe('when there are multiple high scores', () => {
        it('should declare all the players with the high scores as winners', () => {
          player1.object.score = 3;
          player2.object.score = 3;
          player3.object.score = 2;

          game.addCardToTalon(player1.object, highCard);
          game.addCardToTalon(player2.object, card);
          game.addCardToTalon(player3.object, card);

          expect(game.state).to.equal('over');
          expect(game.winners).to.deep.equal([player1.object, player2.object]);
        });
      });
    });
  });
});
