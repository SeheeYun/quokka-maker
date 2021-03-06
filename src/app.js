import { observer } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';
import CardList from './pages/cardList';
import CardMaker from './pages/cardMaker';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App({ authService, imgUploader }) {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home authService={authService} />
          </Route>
          <Route path="/login">
            <Login authService={authService} />
          </Route>
          <Route path="/card-list">
            <CardList />
          </Route>
          <Route path="/card-maker">
            <CardMaker imgUploader={imgUploader} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
