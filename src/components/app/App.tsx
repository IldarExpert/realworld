import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Article from '../article/article';
import GlobalFeed from '../globalFeed/globalFeed';
import Auth from '../auth/auth';
import LoadingScreen from '../loading-screen/loading-screen';

import {AppRoute} from '../../const';
import {useSelector} from 'react-redux';
import {getIsLoading} from '../../store/user-reducer/selectors';
import TopBar from '../topBar/topBar';
import TagFeed from '../tag-feed/tag-feed';
import YourFeed from '../your-feed/your-feed';
import CreateArticle from '../create-article/create-article';
import EditArticle from '../edit-article/edit-article';
import Settings from '../settings/settings';

function App(): JSX.Element {
  const isLoading = useSelector(getIsLoading);

  if (isLoading) {
    return <LoadingScreen/>;
  }

  return (
    <BrowserRouter>
      <TopBar/>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <GlobalFeed/>
        </Route>
        <Route exact path={AppRoute.NewArticle}>
          <CreateArticle/>
        </Route>
        <Route exact path={AppRoute.Article}>
          <Article/>
        </Route>
        <Route path={AppRoute.Editor}>
          <EditArticle/>
        </Route>
        <Route path={AppRoute.Login}>
          <Auth/>
        </Route>
        <Route path={AppRoute.Register}>
          <Auth/>
        </Route>
        <Route path={AppRoute.Tags}>
          <TagFeed/>
        </Route>
        <Route path={AppRoute.Feed}>
          <YourFeed/>
        </Route>
        <Route path={AppRoute.Settings}>
          <Settings/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
