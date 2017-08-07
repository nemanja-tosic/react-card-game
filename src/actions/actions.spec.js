import * as actions from './';
import * as types from './const';

describe('actions', () => {
  describe('#startGame(playerName, numberOfOpponents)', () => {
    it('should create a FSA using the provided parameters', () => {
      const playerName = 'myName';
      const numberOfOpponents = 3;
      const expectedAction = {
        type: types.START_GAME,
        payload: {
          playerName,
          numberOfOpponents,
        },
      };

      expect(actions.startGame(playerName, numberOfOpponents)).toMatchObject(expectedAction);
    });
  });

  describe('#playCard(cardIndex)', () => {
    it('should create a FSA using the provided parameters', () => {
      const cardIndex = 3;
      const expectedAction = {
        type: types.PLAYER_PLAY_CARD,
        payload: {
          cardIndex,
        },
      };

      expect(actions.playCard(cardIndex)).toMatchObject(expectedAction);
    });
  });

  describe('#newGame()', () => {
    it('should create a FSA using the provided parameters', () => {
      const expectedAction = {
        type: types.NEW_GAME,
      };

      expect(actions.newGame()).toMatchObject(expectedAction);
    });
  });
});
