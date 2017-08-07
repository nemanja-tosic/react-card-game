import * as types from './const';

export const startGame = (playerName, numberOfOpponents) => ({
  type: types.START_GAME,
  payload: {
    playerName,
    numberOfOpponents,
  },
});

export const playCard = (cardIndex) => ({
  type: types.PLAYER_PLAY_CARD,
  payload: {
    cardIndex,
  },
});

export const newGame = () => ({
  type: types.NEW_GAME,
});
