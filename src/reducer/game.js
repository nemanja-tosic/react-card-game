import * as types from '../actions/const';
import * as actions from '../middleware/game/actions';

const defaultState = {
  state: 'notStarted',
};

export const game = (state = defaultState, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return defaultState;
    case actions.GAME_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
