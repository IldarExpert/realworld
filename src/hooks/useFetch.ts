import {useState, useEffect} from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {BASE_URL} from '../servises/api';

function useFetch(url: string): any {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [option, setOption] = useState({});

  const doFetch = (options: {method: string, data: any} = {method: 'get', data: {}}): void => {
    // eslint-disable-next-line no-console
    console.log('doFetch');

    setOption(options);
    setIsLoading(true);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('useEffect');

    if (!isLoading) {
      return;
    }

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
  }, [isLoading, option, url]);


  return [{response, error, isLoading}, doFetch] ;
}

export default useFetch;
