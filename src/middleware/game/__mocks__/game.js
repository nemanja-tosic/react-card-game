import * as sinon from 'sinon';

let gameMock = sinon.mock();
export const __setGameMock = (mock) => {
  gameMock = mock;
};

let playerMock = sinon.mock();
export const __setPlayerMock = (mock) => {
  playerMock = mock;
};

export const createSinglePlayerGame = jest.fn(() => ({
  game: gameMock.object,
  player: playerMock.object,
}));
