import { observer } from 'mobx-react';
import React from 'react';
import styles from './mood.module.css';

const Mood = ({ store: { rotate, isToggleClick }, mood }) => (
  <div
    className={styles.mood}
    style={
      isToggleClick
        ? { transform: `translate(${mood.x}px,${mood.y}px)` }
        : { transform: 'translate(0,0)' }
    }
  >
    <button
      className={styles.btn}
      style={{ transform: `rotate(${-rotate}rad)` }}
    >
      <img
        alt="img"
        draggable="false"
        src={process.env.PUBLIC_URL + mood.bgImage}
      />
    </button>
  </div>
);

export default observer(Mood);
