import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ApiRoute, AppRoute, AuthStatus} from '../../const';
import {getAuthStatus} from '../../store/user-reducer/selectors';

type FeedTogglerProps = {
  tagName?: string | undefined
}

function FeedToggler({tagName}: FeedTogglerProps): JSX.Element {
  const userAuthStatus = useSelector(getAuthStatus);

  return (
    <div className="feed-toggler">
      <ul className="nav nav-pills outline-active">
        {userAuthStatus === AuthStatus.Auth &&
        <li className="nav-item">
          <NavLink to={ApiRoute.Feed} className="nav-link">
            Your feed
          </NavLink>
        </li>}
        <li className="nav-item">
          <NavLink to={AppRoute.Main} className="nav-link" exact>
            Global feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink to={`${ApiRoute.Tags}/${tagName}`} className="nav-link" exact>
              <i className="ion-pound"/>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default FeedToggler;
