import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Provider } from 'mobx-react';
import store from './store/store';
import AuthService from './service/auth_service';

const authService = new AuthService();
ReactDOM.render(
  <Provider store={store}>
    <App authService={authService} />
  </Provider>,
  document.getElementById('root')
);
