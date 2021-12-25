export type UserReducer = {
  user: UserReducerFromServer,
  isLoading: boolean,
  authStatus: string,
};

export type UserReducerFromServer = {
  bio: null | string,
  email: string,
  image: string,
  token: string,
  username: string,
}

