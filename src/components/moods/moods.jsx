import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import Mood from '../mood/mood';
import styles from './moods.module.css';
import useMatchMedia from '../../hooks/useMatchMedia';

const Moods = ({ store, onMoodClick }) => {
  const requestRef = useRef();

  const animate = () => {
    store.setRotate();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const { isMatches } = useMatchMedia('767');

  useEffect(() => {
    store.translateMoods(isMatches);
  }, [isMatches]);

  return (
    <div
      className={styles.wrap}
      onPointerDown={e => store.onPointerDown(e)}
      onPointerMove={e => store.onPointerMove(e)}
      onPointerUp={e => store.onPointerUp(e)}
    >
      <div
        className={styles.moods}
        style={{ transform: `rotate(${store.rotate}rad)` }}
      >
        {store.moods.map((mood, index) => (
          <Mood
            key={index}
            mood={mood}
            store={store}
            onMoodClick={onMoodClick}
          />
        ))}
      </div>
    </div>
  );
};

export default observer(Moods);
