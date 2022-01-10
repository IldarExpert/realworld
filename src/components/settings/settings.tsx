import ErrorMessages from '../error-messages/error-messages';
import {FormEvent, useEffect, useState} from 'react';
import useFetch from '../../hooks/useFetch';
import {ApiRoute, AppRoute} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../store/user-reducer/selectors';
import {saveAuthData, logOut} from '../../store/action';
import useLocalStorage from '../../hooks/useLocalStorage';
import {Redirect, useHistory} from 'react-router';

function Settings(): JSX.Element {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState<string | null>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = ApiRoute.User;
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [, setToken] = useLocalStorage('realworld-token');
  const history = useHistory();
  const [shouldLogOut, setShouldLogOut] = useState(false);
  const [sholudRedirect, setShouldRedirect] = useState(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (name !== user.username) {
      setShouldLogOut(true);
    }
    doFetch({
      method: 'PUT',
      data: {
        user: {
          username: name,
          image,
          bio,
          email,
          password,
        },
      },
    });
  };

  const logoutHandle = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(logOut());
    setToken('');
    setShouldRedirect(true);
  };

  useEffect(() => {
    if (shouldLogOut && name === user.username) {
      dispatch(logOut());
      setToken('');
      setShouldRedirect(true);
    }
  }, [shouldLogOut, user.username, setToken, dispatch, name]);


  useEffect(() => {
    if (!user) {
      return;
    }
    setImage(user.image);
    setName(user.username);
    setBio(user.bio);
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch(saveAuthData(response.user));
    setToken(response.user.token);
    if (!shouldLogOut) {
      history.push(AppRoute.Main);
    }
  }, [response, dispatch, setToken, history, shouldLogOut]);


  if (sholudRedirect) {
    return <Redirect to={AppRoute.Main} />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <ErrorMessages errorMessages={error}/>}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={(evt) => setImage(evt.target.value)}
                    autoComplete="on"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                    autoComplete="on"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    value={bio ? bio : ''}
                    rows={8}
                    onChange={(evt) => setBio(evt.target.value)}
                    autoComplete="on"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                    autoComplete="on"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="New password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value)}
                    autoComplete="on"
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr/>
            <button className="btn btn-outline-danger" onClick={logoutHandle}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
