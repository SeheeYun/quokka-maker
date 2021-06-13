import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import { Provider } from 'mobx-react';
import store from './store/store';
import AuthService from './service/auth_service';
import ImgUploader from './service/img_uploader';

const authService = new AuthService();
const imgUploader = new ImgUploader();
ReactDOM.render(
  <Provider store={store}>
    <App authService={authService} imgUploader={imgUploader} />
  </Provider>,
  document.getElementById('root')
);
