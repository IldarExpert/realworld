import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Article from '../article/article';
import GlobalFeed from '../globalFeed/globalFeed';
import Auth from '../auth/auth';

import {AppRoute} from '../../const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Article />
        </Route>
        <Route path={AppRoute.GlobalFeed}>
          <GlobalFeed />
        </Route>
        <Route path={AppRoute.Login}>
          <Auth />
        </Route>
        <Route path={AppRoute.Register}>
          <Auth />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
