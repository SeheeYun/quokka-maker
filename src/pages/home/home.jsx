import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import styles from './home.module.css';
import Header from '../../components/header/header';
import Moods from '../../components/moods/moods';
import Thumbnails from '../../components/thumbnails/thumbnails';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useHistory } from 'react-router';

const Home = ({ store, authService }) => {
  const history = useHistory();
  const rotate = store.isMoods ? styles.rotate : '';

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
      <div className={styles.div}>
        <button className={`${styles.btn} ${rotate}`} onClick={onAddBtnClick}>
          <AddRoundedIcon style={{ color: 'var(--bg-color)' }} />
        </button>
        {store.isMoods && <Moods store={store} onMoodClick={onMoodClick} />}
        <Thumbnails cards={store.sortedCards} />
      </div>
    </>
  );
};

export default inject('store')(observer(Home));
