import * as actions from '../actions';
import { TestGame } from '../../../test/support/test-game';

export const createGameUpdateAction = () => {
  const gameInfo = TestGame.create();
  return actions.gameUpdate(gameInfo);
};
