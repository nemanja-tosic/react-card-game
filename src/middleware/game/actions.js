export const GAME_STARTING = 'GAME_STARTING';
export const GAME_UPDATE = 'GAME_UPDATE';

export const gameUpdate = (gameInfo) => ({
  type: GAME_UPDATE,
  payload: gameInfo,
});
