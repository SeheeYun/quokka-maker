import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Moods from '../../components/moods/moods';
import styles from './home.module.css';

const Home = ({ store }) => {
  useEffect(() => {
    store.translateMoods();
  }, []);

  const onClick = () => {
    store.DisableClick();
  };

  return (
    <div
      className={styles.div}
      onPointerDown={e => store.onPointerDown(e)}
      onPointerMove={e => store.onPointerMove(e)}
      onPointerUp={e => store.onPointerUp(e)}
    >
      <button className={styles.btn} onClick={onClick}>
        +
      </button>
      {store.isMoods && <Moods store={store}></Moods>}
    </div>
  );
};

export default observer(Home);
