import { observer } from 'mobx-react';
import React from 'react';
import styles from './card.module.css';

const Card = ({ card, onCardClick }) => {
  return (
    <li className={styles.li} key={card.date} onClick={() => onCardClick(card)}>
      <div className={styles.div}>
        <div className={styles.date}>{card.date}</div>
        <img
          draggable="false"
          src={process.env.PUBLIC_URL + card.mood.bgImage}
          alt="img"
        />
        <p className={styles.p}>{card.mood.description}</p>
        <div className={styles.photo_wrap}>
          <div className={styles.photo}>
            <img src={process.env.PUBLIC_URL + ''} alt="img" />
          </div>
        </div>
        <p className={styles.text}>{card.text}</p>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn}>수정</button>
        <button className={styles.btn}>삭제</button>
      </div>
    </li>
  );
};

export default observer(Card);
