import { PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { saveAuthData, updateAuthStatus, updateLoaddingStatus } from '../../store/action';
import { AppRoute, AuthStatus } from '../../const';
import useLocalStorage from '../../hooks/useLocalStorage';

function UserChecker({children}: PropsWithChildren<any>): JSX.Element {
  const [{response}, doFetch] = useFetch(AppRoute.User);
  const dispatch = useDispatch();
  const [token] = useLocalStorage('realworld-token');

  useEffect(() => {
    if (!token) {
      dispatch(updateAuthStatus(AuthStatus.NoAuth));
      return;
    }
    doFetch();
    dispatch(updateLoaddingStatus(true));
  }, [token, dispatch, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('response', response);
    dispatch(saveAuthData(response.user));
    dispatch(updateAuthStatus(AuthStatus.Auth));
    dispatch(updateLoaddingStatus(false));
  }, [response, dispatch]);

  return children;
}

export default UserChecker;
