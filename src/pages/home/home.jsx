import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import Header from '../../components/header_home/header';
import Moods from '../../components/moods/moods';
import Thumbnails from '../../components/thumbnails/thumbnails';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useHistory } from 'react-router';

import styles from './home.module.css';

const Home = ({ store, authService }) => {
  const rotate = store.isMoods ? styles.rotate : '';

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
    const stopCards = store.setCards();
    return () => stopCards();
  }, [store.uid]);

  useEffect(() => {
    const images = store.moods.map(mood => mood.bgImage);
    images.map(image => {
      const img = new Image();
      img.src = process.env.PUBLIC_URL + image;
    });
  }, []);

  return (
    <div className={styles.wrap}>
      <Header
        page="home"
        uid={store.uid}
        isLoaded={store.isLoaded}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      <button className={`${styles.btn} ${rotate}`} onClick={onAddBtnClick}>
        <AddRoundedIcon style={{ color: 'var(--bg-color)' }} />
      </button>
      {store.isMoods && <Moods store={store} onMoodClick={onMoodClick} />}
      <Thumbnails cards={store.cards} isLoaded={store.isLoaded} />
    </div>
  );
};

export default inject('store')(observer(Home));
