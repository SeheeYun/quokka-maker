import { observer } from 'mobx-react';
import React from 'react';
import styles from './modal.module.css';

const Modal = ({ onModalClick }) => (
  <div className={styles.wrap} onClick={onModalClick}>
    <div className={styles.modal}>
      <img src={process.env.PUBLIC_URL + '/images/mood6.svg'} alt="img" />
      <p>해당 날짜의 일기가 존재 합니다.</p>
      <button className={styles.btn}>확인</button>
    </div>
  </div>
);

export default observer(Modal);
