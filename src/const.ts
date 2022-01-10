export const AppRoute = {
  Main: '/',
  Article: '/article/:slug',
  Editor: '/editor/:slug',
  NewArticle: '/articles/new',
  Login: '/login',
  Register: '/register',
  User: '/user',
  Tags: '/tags/:slug',
  Feed: '/feed',
  Settings: '/settings',
};

export const ApiRoute = {
  Login: '/users/login',
  Editor: '/editor',
  Articles: '/articles',
  Article: '/article',
  Register: '/users',
  User: '/user',
  Tags: '/tags',
  Feed: '/feed',
  YourFeed: '/articles/feed',
};

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const LIMIT_PER_PAGE = 2;
