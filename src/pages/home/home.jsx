import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Moods from '../../components/moods/moods';
import HomeCardList from '../../components/home-card-list/homeCardList';
import styles from './home.module.css';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

const Home = ({ store }) => {
  useEffect(() => {
    store.translateMoods();
  }, []);

  const onClick = () => {
    store.DisableClick();
  };

  return (
    <div className={styles.div}>
      <button className={styles.btn} onClick={onClick}>
        <AddRoundedIcon fontSize="large" style={{ color: 'var(--bg-color)' }} />
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
  );
};

export default observer(Home);
