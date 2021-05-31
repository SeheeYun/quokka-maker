import { inject, observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';
import Header from './components/header/header';
import CardList from './pages/card-list/cardList';
import CardMaker from './pages/card-maker/cardMaker';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App({ store }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Header page={'home'} />
            <Home store={store.homeStore} />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/card-list">
            <Header />
            <CardList />
          </Route>
          <Route path="/card-maker">
            <CardMaker />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default inject('store')(observer(App));
