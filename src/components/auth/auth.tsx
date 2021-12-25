import { useState, useEffect } from 'react';
import {Link, Redirect, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import TopBar from '../topBar/topBar';
import {AppRoute, ApiRoute, AuthStatus} from '../../const';
import { saveAuthData, updateAuthStatus, updateLoaddingStatus } from '../../store/action';


function Auth():JSX.Element {
  const location = useLocation();
  const isLogin = location.pathname === AppRoute.Login;

  const pageTitle = isLogin? 'Sign in': 'Sign up';
  const descriptionLink = isLogin? AppRoute.Register: AppRoute.Login;
  const descriptionText = isLogin? 'Need an account?': 'Have an account?';
  const apiUrl = isLogin? ApiRoute.Login: ApiRoute.Register;

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);

  const [{response, error, isLoading}, doFetch ] = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage('realworld-token');

  const dispatch = useDispatch();

  // eslint-disable-next-line no-console
  console.log('render');

  // eslint-disable-next-line no-console
  console.log('response, error, isLoading', response, error, isLoading, token);

  const handleSubmit = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    const user = isLogin? {email, password} : {email, password, username};

    doFetch({
      method: 'POST',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setToken(response.user.token);
    dispatch(saveAuthData(response.user));
    dispatch(updateAuthStatus(AuthStatus.Auth));
    dispatch(updateLoaddingStatus(false));
    setIsSuccessSubmit(true);
  }, [response, setToken, dispatch]);

  if(isSuccessSubmit) {
    return <Redirect to={AppRoute.Main} />;
  }


  return (
    <>
      <TopBar />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{pageTitle}</h1>
              <p className="text-xs-center">
                <Link to={descriptionLink}>{descriptionText}</Link>
              </p>
              <form>
                <fieldset>
                  {!isLogin && (
                    <fieldset className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Username"
                        value={username}
                        onChange={(evt) => setUserName(evt.target.value)}
                      />
                    </fieldset>
                  )}
                  <fieldset className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(evt) => setEmail(evt.target.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      autoComplete="on"
                      onChange={(evt) => setPassword(evt.target.value)}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {pageTitle}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Auth;
