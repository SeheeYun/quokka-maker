import { observer } from 'mobx-react';
import React from 'react';
import styles from './cardMaker.module.css';

const CardList = props => {
  return (
    <ul className={styles.ul}>
      <li className={styles.li}>
        <div className={styles.div}>
          <div className={styles.date}>날짜</div>
          <img
            draggable="false"
            src={process.env.PUBLIC_URL + '/images/mood1.svg'}
            alt="img"
          />
          <p className={styles.p}>기분 최고!</p>
          <div className={styles.photo_wrap}>
            <div className={styles.photo}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  '/images/1582721043_blackpink-lot-xac-hoan-toan-trong-du-an-moi-banh-beo-100-2a7106.jpg'
                }
                alt="img"
              />
            </div>
          </div>
          <p>djaldjdsadlha sajdklajl askdjlajdklajkdj askjdlkajlkajasj</p>
        </div>
        <div className={styles.btns}>이미지삽입 이미지삭제</div>
      </li>
    </ul>
  );
};

export default observer(CardList);
