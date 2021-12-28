import { AuthStatus } from '../const';
import { RootState } from '../store/root-reducer';

export type UserReducer = {
  user: UserReducerFromServer,
  isLoading: boolean,
  authStatus: AuthStatus,
};

export type UserReducerFromServer = {
  bio: null | string,
  email: string,
  image: string,
  token: string,
  username: string,
}

export type State = RootState;
