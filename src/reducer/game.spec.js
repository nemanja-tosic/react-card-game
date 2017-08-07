import { game as reducer } from './game';
import * as types from '../actions/const';
import * as middlewareFixtures from '../middleware/game/testing/action-fixtures';

describe('game reducer', () => {
  const expectedDefaultState = {
    state: 'notStarted',
  };

  it('should return the initial state', () => {
    const action = undefined;

    const state = reducer(action, {});

    expect(state).toEqual(expectedDefaultState);
  });

  it('should handle NEW_GAME', () => {
    const action = {type: types.NEW_GAME};

    const state = reducer({}, action);

    expect(state).toEqual(expectedDefaultState);
  });

  it('should handle GAME_UPDATE', () => {
    const action = middlewareFixtures.createGameUpdateAction();
    const initialState = {
      state: 'inProgress',
    };

    const state = reducer(initialState, action);

    expect(state).toMatchObject(action.payload);
  });
});
