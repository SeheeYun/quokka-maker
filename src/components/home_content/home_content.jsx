import React from 'react';
import styles from './home_content.module.css';
import Moods from '../../components/moods/moods';
import Thumbnails from '../../components/thumbnails/thumbnails';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { observer } from 'mobx-react';

const HomeContent = ({ store, onMoodClick, onAddBtnClick }) => {
  const rotate = store.isMoods ? styles.rotate : '';

  return (
    <div className={styles.wrap}>
      <button className={`${styles.btn} ${rotate}`} onClick={onAddBtnClick}>
        <AddRoundedIcon style={{ color: 'var(--bg-color)' }} />
      </button>
      {store.isMoods && <Moods store={store} onMoodClick={onMoodClick} />}
      <Thumbnails cards={store.cards} isLoaded={store.isLoaded} />
    </div>
  );
};

export default observer(HomeContent);
