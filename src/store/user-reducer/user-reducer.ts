import {createReducer} from '@reduxjs/toolkit';
import {logOut, saveAuthData, updateAuthStatus, updateLoaddingStatus} from '../action';
import {UserReducer} from '../../types/state';
import {AuthStatus} from '../../const';

const initialState: UserReducer = {
  user: {
    bio: null,
    email: '',
    image: '',
    token: '',
    username: '',
  },
  isLoading: false,
  authStatus: AuthStatus.Unknown,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveAuthData, (state, action) => {
      // const user = action.payload;
      state.user = action.payload;
    })
    .addCase(logOut, (state, action) => {
      state.user = initialState.user;
      state.authStatus = AuthStatus.NoAuth;
    })
    .addCase(updateAuthStatus, (state, action) => {
      // const authStatus = action.payload;
      state.authStatus = action.payload;
    })
    .addCase(updateLoaddingStatus, (state, action) => {
      // const isLoading = action.payload;
      state.isLoading = action.payload;
    });
});

export default userReducer;
