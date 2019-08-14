import * as types from './action-types';

export function addMessagesAction(messages) {
  return {
    type: types.ADD_MESSAGES,
    messages,
  };
}

export function deleteMessagesAction() {
  return {
    type: types.DELETE_MESSAGES,
  };
}
