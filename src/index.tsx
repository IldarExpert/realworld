import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import App from './components/app/app';
import UserChecker from './components/user-checker/user-checker';
import { rootReducer } from './store/root-reducer';
import {createAPI} from './servises/api';

const api = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserChecker>
        <App />
      </UserChecker>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
