import * as types from './action-types';

export function addUsernameAction(username) {
  return {
    type: types.ADD_USERNAME,
    username,
  };
}

export function deleteUsernameAction() {
  return {
    type: types.DELETE_USERNAME,
  };
}
