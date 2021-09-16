import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import Header from '../components/header/header';
import { useHistory } from 'react-router';
import HomeContent from '../components/home_content/home_content';

const Home = ({ store, authService }) => {
  const history = useHistory();

  const onLoginClick = () => {
    history.push('/login');
  };

  const onLogoutClick = () => {
    authService //
      .logout()
      .catch(e => {
        console.log(e);
      });
  };

  const onAddBtnClick = () => {
    store.disableClick();
  };

  const onMoodClick = useCallback(mood => {
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

  useEffect(() => {
    const stopCard = store.setCards();
    return () => stopCard();
  }, [store.uid]);

  useEffect(() => {
    const images = store.moods.map(mood => mood.bgImage);
    images.map(image => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + image;
    });
  }, []);

  return (
    <>
      <Header
        page={'home'}
        uid={store.uid}
        isLoaded={store.isLoaded}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
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
