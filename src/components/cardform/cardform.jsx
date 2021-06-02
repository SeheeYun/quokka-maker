import { observer } from 'mobx-react';
import React from 'react';
import styles from './cardform.module.css';
import { TextareaAutosize } from '@material-ui/core';

const Cardform = ({ onDateChange, dateRef, textRef, mood }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.div}>
        <input
          ref={dateRef}
          type="date"
          className={styles.date}
          onChange={onDateChange}
        />
        <img
          draggable="false"
          src={process.env.PUBLIC_URL + mood.bgImage}
          alt="img"
        />
        <p className={styles.p}>{mood.description}</p>
        <div className={styles.photo_wrap}>
          <div className={styles.photo}>
            <img src={process.env.PUBLIC_URL + ''} alt="img" />
          </div>
        </div>
        <TextareaAutosize ref={textRef} spellCheck="false" />
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>이미지 삽입</button>
        <button className={styles.btn}>이미지 삭제</button>
      </div>
    </div>
  );
};

export default observer(Cardform);
