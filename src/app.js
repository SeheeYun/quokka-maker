import { inject, observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';
import Header from './components/header/header';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App({ store }) {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home store={store.homeStore} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default inject('store')(observer(App));
