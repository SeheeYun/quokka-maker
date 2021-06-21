import { observer } from 'mobx-react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './tooltip.module.css';

const Tooltip = () => {
  const [className, setClassName] = useState();
  const timerRef = useRef();

  function delay(func, ms) {
    return new Promise(
      resolve =>
        (timerRef.current = setTimeout(() => {
          func();
          resolve(timerRef.current);
        }, ms))
    );
  }

  useEffect(() => {
    setClassName(styles.none);
    delay(() => setClassName(styles.on), 3000)
      .then(() => delay(() => setClassName(styles.off), 4000))
      .then(() => delay(() => setClassName(styles.none), 500));

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className={`${styles.wrap} ${className}`}>
      <div className={`${styles.tooltip} ${className}`}>
        <p>
          버튼을 누르면
          <br />
          쿼카가 튀어나옵니다.
        </p>
        <p>
          '좌우로 드래그'해서
          <br />
          움직여보세요!
        </p>
      </div>
    </div>
  );
};

export default observer(Tooltip);
