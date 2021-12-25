import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export const BASE_URL = 'https://conduit.productionready.io/api';
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  BadData: 422,
  Unauthorized: 403,
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    // eslint-disable-next-line no-console
    console.log('api.interceptors.request');

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      // eslint-disable-next-line no-console
      console.log('response', response);
    },
    (error: AxiosError) => {
      if(error.response?.status === HttpCode.BadData) {
        // eslint-disable-next-line no-console
        console.log('BadData: 422', error);
        return;
      }
      // eslint-disable-next-line no-console
      console.log('error', error);
      // return Promise.reject(error);
    },
  );

  return api;
};
