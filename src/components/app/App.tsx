import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Article from '../article/article';
import GlobalFeed from '../globalFeed/globalFeed';
import Auth from '../auth/auth';
import LoadingScreen from '../loading-screen/loading-screen';

import {AppRoute} from '../../const';
import { useSelector } from 'react-redux';
import { getIsLoading } from '../../store/user-reducer/selectors';

function App(): JSX.Element {
  const isLoading = useSelector(getIsLoading);
  // eslint-disable-next-line no-console
  console.log('isLoading', isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
