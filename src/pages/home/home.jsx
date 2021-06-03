import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styles from './home.module.css';
import Header from '../../components/header/header';
import Moods from '../../components/moods/moods';
import HomeCards from '../../components/home_cards/homeCards';
import useMatchMedia from '../../hooks/useMatchMedia';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useHistory } from 'react-router';

const Home = ({ store }) => {
  const history = useHistory();
  const rotate = store.isMoods ? styles.rotate : '';
  const { isMatches } = useMatchMedia('767');

  const onAddClick = () => {
    store.disableClick();
  };

  const onThumbClick = () => {
    history.push('/card-list');
  };

  const onMoodClick = mood => {
    history.push({
      pathname: '/card-maker',
      state: { mood: mood },
    });
    store.setMoods();
    store.setToggleClick();
  };

  useEffect(() => {
    store.translateMoods(isMatches);
  }, [isMatches]);

  return (
    <>
      <Header page={'home'} />
      <div className={styles.div}>
        <button className={`${styles.btn} ${rotate}`} onClick={onAddClick}>
          <AddRoundedIcon style={{ color: 'var(--bg-color)' }} />
        </button>
        {store.isMoods && <Moods store={store} onMoodClick={onMoodClick} />}
        <HomeCards cards={store.cards} onThumbClick={onThumbClick} />
      </div>
    </>
  );
};

export default inject('store')(observer(Home));
