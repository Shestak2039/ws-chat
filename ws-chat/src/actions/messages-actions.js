import * as types from './action-types';

export default function addMessagesAction(messages) {
  return {
    type: types.ADD_MESSAGES,
    messages,
  };
}
