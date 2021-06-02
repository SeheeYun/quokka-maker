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
        {store.isMoods && (
          <div
            className={styles.wrap}
            onPointerDown={e => store.onPointerDown(e)}
            onPointerMove={e => store.onPointerMove(e)}
            onPointerUp={e => store.onPointerUp(e)}
          >
            <Moods store={store} />
          </div>
        )}
        <HomeCardList />
      </div>
    </>
  );
};

export default inject('store')(observer(Home));
