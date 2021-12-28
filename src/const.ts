export const AppRoute = {
  Main: '/',
  Article: '/article',
  GlobalFeed: '/globalFeed:slug',
  Login: '/login',
  Register: '/register',
  User: '/user',
};

export const ApiRoute = {
  Login: '/users/login',
  Register: '/users',
};

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
