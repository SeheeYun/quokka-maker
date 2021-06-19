import { observer } from 'mobx-react';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from './tooltip.module.css';

const Tooltip = ({ toggleClick }) => {
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
    delay(() => setClassName(styles.on_tooltip_1), 2000) //
      .then(() => delay(() => toggleClick(), 1000))
      .then(() => delay(() => setClassName(styles.off_tooltip_1), 3000))
      .then(() => delay(() => setClassName(styles.on_tooltip_2), 2000))
      .then(() => delay(() => setClassName(styles.off_tooltip_2), 3000))
      .then(() => delay(() => setClassName(styles.none), 500));

    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className={`${styles.wrap} ${className}`}>
      <div className={`${styles.tooltip} ${styles.tooltip_1} ${className}`}>
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
      <div className={`${styles.tooltip} ${styles.tooltip_2} ${className}`}>
        <p>
          감정을 선택하고
          <br />
          일기를 작성합니다.
        </p>
        <p>
          아직 로그인하지 않았다면
          <br />
          로그인 페이지로 넘어갑니다.
        </p>
      </div>
    </div>
  );
};

export default observer(Tooltip);