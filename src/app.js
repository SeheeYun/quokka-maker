import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';
import Header from './components/header/header';
import Home from './components/home/home';
import Login from './components/login/login';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
