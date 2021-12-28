import { State, UserReducerFromServer } from '../../types/state';
import { NameSpace } from '../root-reducer';
import { AuthStatus } from '../../const';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.user].authStatus;
export const getIsLoading = (state: State): boolean => state[NameSpace.user].isLoading;
export const getUser = (state: State): UserReducerFromServer => state[NameSpace.user].user;

