import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import Header from '../components/header/header';
import { useHistory } from 'react-router';
import HomeContent from '../components/home_content/home_content';

const Home = ({ store, authService }) => {
  console.log(store.sortedCards);
  const history = useHistory();

  const onLoginClick = () => {
    history.push('/login');
  };

  const onLogoutClick = () => {
    authService //
      .logout()
      .then(() => {
        console.log('ok');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onAddBtnClick = () => {
    store.disableClick();
  };

  const onMoodClick = useCallback(mood => {
    console.log(store.uid);
    if (!store.uid) {
      onLoginClick();
      return;
    }

    history.push({
      pathname: '/card-maker',
      state: {
        mood: mood,
        page: 'add',
      },
    });
    store.setMoods();
    store.setToggleClick();
  }, []);

  useEffect(() => {
    authService //
      .onAuthStateChanged(user => {
        if (user) {
          store.setUid(user.uid);
        } else {
          store.setUid(null);
        }
      });
  }, []);

  return (
    <>
      <Header
        page={'home'}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        uid={store.uid}
      />
      <HomeContent
        store={store}
        onMoodClick={onMoodClick}
        onAddBtnClick={onAddBtnClick}
      />
    </>
  );
};

export default inject('store')(observer(Home));
