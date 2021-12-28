import {useState, useEffect, useCallback} from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {BASE_URL} from '../servises/api';
import useLocalStorage from './useLocalStorage';

function useFetch(url: string): any {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [option, setOption] = useState({});
  const [token] = useLocalStorage('realworld-token');

  const doFetch = useCallback((options: {method: string, data: any} = {method: 'get', data: {}}): void => {
    setOption(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect');

    if (!isLoading) {
      return;
    }

    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if(token) {
          config.headers['authorization'] = `Token ${token}`;
        }

        return config;
      },
    );

    axios(`${BASE_URL}${url}`, option)
      .then((result: AxiosResponse) => {
        // eslint-disable-next-line no-console
        console.log('result', result);
        setResponse(result.data);
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        setError(err.response?.data);
        setIsLoading(false);
      });
  }, [isLoading, option, url, token]);


  return [{response, error, isLoading}, doFetch] ;
}

export default useFetch;
