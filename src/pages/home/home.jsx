import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styles from './home.module.css';
import Header from '../../components/header/header';
import Moods from '../../components/moods/moods';
import HomeCardList from '../../components/home-card-list/homeCardList';
import useMatchMedia from '../../hooks/useMatchMedia';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const Home = ({ store }) => {
  const rotate = store.isMoods ? styles.rotate : '';

  const { isMatches } = useMatchMedia('767');

  useEffect(() => {
    store.translateMoods(isMatches);
  }, [isMatches]);

  useEffect(() => {
    return () => {
      store.setMoods();
      store.setToggleClick();
    };
  }, []);

  const onClick = () => {
    store.disableClick();
  };

  return (
    <>
      <Header page={'home'} />
      <div className={styles.div}>
        <button className={`${styles.btn} ${rotate}`} onClick={onClick}>
          <AddRoundedIcon style={{ color: 'var(--bg-color)' }} />
        </button>
        {store.isMoods && <Moods store={store} />}
        <HomeCardList />
      </div>
    </>
  );
};

export default inject('store')(observer(Home));
