import {Link, NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {AppRoute, AuthStatus} from '../../const';
import { getAuthStatus, getUser } from '../../store/user-reducer/selectors';

function TopBar (): JSX.Element {
  const authData = useSelector(getAuthStatus);
  const {username, image, email} = useSelector(getUser);
  // eslint-disable-next-line no-console
  console.log('username, image, email', username, image, email);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to={AppRoute.Main} className="nav-link" exact>
              Home
            </NavLink>
          </li>
          {authData !== AuthStatus.Auth ? (
            <>
              <li className="nav-item">
                <NavLink to={AppRoute.Login} className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={AppRoute.Register} className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </>):
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/editor/">
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link ng-binding" to={`/@${username}`}>
                  <img className="user-pic" src={image} alt={username} />
                  {username}
                </NavLink>
              </li>
            </>}
        </ul>
      </div>
    </nav>
  );
}

export default TopBar;
