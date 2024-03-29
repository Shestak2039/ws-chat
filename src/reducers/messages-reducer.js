import * as types from '../actions/action-types';

const initialState = {
  messages: [],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MESSAGES:
      return { ...state, messages: state.messages.concat(action.messages) };
    case types.DELETE_MESSAGES:
      return { ...state, messages: [] };
    default:
      return state;
  }
};

export default messagesReducer;
