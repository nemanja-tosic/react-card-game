import configureStore from 'redux-mock-store';
import * as sinon from 'sinon';

import { __setGameMock, __setPlayerMock } from 'game';

import { singlePlayerMiddleware } from './single-player-middleware';
import * as actions from './actions';
import { playCard as playCardAction, startGame as startGameAction } from '../../actions';

import { TestGame } from '../../test/support/test-game';
import { TestPlayer } from '../../test/support/test-player';
import { TestCards } from '../../test/support/test-cards';

jest.mock('game');

describe('single player middleware', () => {
  let nextSpy;
  let middleware;
  let store;

  const playerName = 'hello';
  const numberOfOpponents = 3;

  const startGame = () => {
    middleware(startGameAction(playerName, numberOfOpponents));
  };

  const playCard = (cardIndex) => {
    middleware(playCardAction(cardIndex));
  };

  beforeEach(() => {
    nextSpy = jest.fn();
    store = configureStore({})();

    middleware = singlePlayerMiddleware(store)(nextSpy);
  });

  describe('when START_GAME is received', () => {
    it('should start a new game', () => {
      const gameMock = sinon.mock({
        attach: () => {
        },
        start: () => {
        },
      });
      __setGameMock(gameMock);
      gameMock.expects('start');

      startGame();

      gameMock.verify();
    });
  });

  describe('when PLAYER_PLAY_CARD is received', () => {
    let playerMock;

    beforeEach(() => {
      const gameMock = sinon.mock({
        attach: () => {
        },
        start: () => {
        },
      });
      __setGameMock(gameMock);
      gameMock.expects('attach');
      gameMock.expects('start');
      playerMock = sinon.mock({
        playCard: () => {
        },
      });
      __setPlayerMock(playerMock);

      startGame();
    });

    it('should call the #playCard action for the player that played the card', () => {
      const cardIndex = 1;
      playerMock
        .expects('playCard')
        .withArgs(cardIndex);

      playCard(cardIndex);

      playerMock.verify();
    });
  });

  describe('responding to game events', () => {
    it('should raise the GAME_UPDATED with the game mapped to the query model', () => {
      // FIXME: extract to a translator and test
      const gameMock = sinon.mock({
        players: [
          {
            id: 0,
            name: 'player 1',
            cards: [
              {
                code: 'JS',
              }
            ],
            score: 0,
          },
          {
            id: 1,
            name: 'player 2',
            cards: [
              {
                code: 'JS',
              }
            ],
            score: 0,
          },
        ],
        state: 'loading',
        winners: null,
        activePlayer: 0,
        talon: new Map(),
        attach: () => {
        },
        start: () => {
        },
      });
      __setGameMock(gameMock);
      const expected = TestGame.create({
        players: [
          TestPlayer.create({
            id: 0,
            name: 'player 1',
            cards: [TestCards.create()],
            score: 0,
            isActive: true,
            isUserControlled: true,
          }),
          TestPlayer.create({
            id: 1,
            name: 'player 2',
            cards: [TestCards.create()],
            score: 0,
            isActive: false,
            isUserControlled: false,
          }),
        ],
        talon: [],
        state: 'loading',
        winners: [],
      });
      const updateObserver = gameMock.expects('attach');
      gameMock.expects('start');

      startGame();
      updateObserver.yield();

      expect(store.getActions()).toContainEqual(actions.gameUpdate(expected));
      gameMock.verify();
    });
  });
});
