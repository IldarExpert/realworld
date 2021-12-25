import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user-reducer/user-reducer';

export const NameSpace = {
  user: 'USER',
};

export const rootReducer = combineReducers({
  [NameSpace.user]: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
