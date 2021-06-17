import { observer } from 'mobx-react';
import React from 'react';
import styles from './mood.module.css';

const Mood = ({ store: { rotate, isToggleClick }, mood, onMoodClick }) => (
  <div
    className={styles.mood}
    style={
      isToggleClick
        ? {
            transform: `translate(${mood.x}px,${mood.y}px)`,
            transition: '200ms cubic-bezier(0.165, 0.84, 0.44, 1)',
          }
        : {
            transform: 'translate(0,0)',
            transition: '200ms cubic-bezier(0.6, -0.28, 0.735, 0.045) ',
          }
    }
  >
    <button
      className={styles.btn}
      style={{ transform: `rotate(${-rotate}rad)` }}
      onClick={() => onMoodClick(mood)}
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
