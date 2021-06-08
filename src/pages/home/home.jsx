import { inject, observer } from 'mobx-react';
import React, { useCallback } from 'react';
import styles from './home.module.css';
import Header from '../../components/header/header';
import Moods from '../../components/moods/moods';
import Thumbnails from '../../components/thumbnails/thumbnails';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useHistory } from 'react-router';

const Home = ({ store }) => {
  console.log(store.sortedCards);
  const history = useHistory();
  const rotate = store.isMoods ? styles.rotate : '';

  const onAddClick = () => {
    store.disableClick();
  };

  const onMoodClick = useCallback(mood => {
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

  return (
    <>
      <Header page={'home'} />
      <div className={styles.div}>
        <button className={`${styles.btn} ${rotate}`} onClick={onAddClick}>
          <AddRoundedIcon style={{ color: 'var(--bg-color)' }} />
        </button>
        {store.isMoods && <Moods store={store} onMoodClick={onMoodClick} />}
        <Thumbnails cards={store.sortedCards} />
      </div>
    </>
  );
};

export default inject('store')(observer(Home));
