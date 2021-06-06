import { observer } from 'mobx-react';
import React from 'react';
import styles from './cardForm.module.css';
import { TextareaAutosize } from '@material-ui/core';

const CardForm = ({ onPropsChange, card, newDate }) => (
  <div className={styles.wrap}>
    <div className={styles.div}>
      <input
        type="date"
        max={newDate}
        className={styles.date}
        defaultValue={card.date ? card.date : ''}
        onChange={e => {
          onPropsChange('date', e.target.value);
        }}
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
      <TextareaAutosize
        spellCheck="false"
        value={card.text ? card.text : ''}
        onChange={e => {
          onPropsChange('text', e.target.value);
        }}
      />
    </div>
    <div className={styles.btns}>
      <button className={styles.btn}>이미지 삽입</button>
      <button className={styles.btn}>이미지 삭제</button>
    </div>
  </div>
);

export default observer(CardForm);
