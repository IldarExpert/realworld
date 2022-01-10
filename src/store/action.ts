import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { UserReducerFromServer } from '../types/state';

export const saveAuthData = createAction(
  ActionType.SaveAuthData,
  (authData: UserReducerFromServer) => ({
    payload: authData,
  }),
);

export const logOut = createAction(
  ActionType.Logout,
);

export const updateLoaddingStatus = createAction(
  ActionType.UpdateLoaddingStatus,
  (status) => ({
    payload: status,
  }),
);

export const updateAuthStatus = createAction(
  ActionType.UpdateAuthStatus,
  (status) => ({
    payload: status,
  }),
);
