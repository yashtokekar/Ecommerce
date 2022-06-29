import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});
