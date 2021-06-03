import { observer } from 'mobx-react';
import React from 'react';
import styles from './cardForm.module.css';
import { TextareaAutosize } from '@material-ui/core';

const CardForm = ({ onDateChange, dateRef, textRef, card }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.div}>
        <input
          ref={dateRef}
          type="date"
          className={styles.date}
          defaultValue={card.date ? card.date : ''}
          onChange={onDateChange}
        />
        <img
          draggable="false"
          src={process.env.PUBLIC_URL + (card.mood ? card.mood.bgImage : '')}
          alt="img"
        />
        <p className={styles.p}>{card.mood ? card.mood.description : ''}</p>
        <div className={styles.photo_wrap}>
          <div className={styles.photo}>
            <img src={process.env.PUBLIC_URL + ''} alt="img" />
          </div>
        </div>
        <TextareaAutosize ref={textRef} spellCheck="false" value={card.text} />
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>이미지 삽입</button>
        <button className={styles.btn}>이미지 삭제</button>
      </div>
    </div>
  );
};

export default observer(CardForm);
