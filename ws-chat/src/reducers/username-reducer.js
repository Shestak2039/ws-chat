import * as types from '../actions/action-types';

const initialState = {
  username: '',
};

const usernameReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USERNAME:
      return { username: action.username };
    case types.DELETE_USERNAME:
      return { username: '' };
    default:
      return state;
  }
};

export default usernameReducer;
