import { inject, observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';
import CardList from './pages/cardList';
import CardMaker from './pages/cardMaker';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App({ store }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home store={store} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/card-list">
            <CardList store={store} />
          </Route>
          <Route path="/card-maker">
            <CardMaker store={store} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default inject('store')(observer(App));
