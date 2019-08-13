import { combineReducers } from 'redux';

import usernameReducer from './username-reducer';
import messagesReducer from './messages-reducer';

const reducers = combineReducers({
  usernameState: usernameReducer,
  messagesState: messagesReducer,
});

export default reducers;
