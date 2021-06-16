import { observer } from 'mobx-react';
import React from 'react';
import styles from './modal.module.css';

const Modal = ({ onModalClick, onDeleteClickModal }) => (
  <div className={styles.wrap} onClick={onModalClick}>
    <div
      className={styles.modal}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <p>정말 이 일기를 삭제하시겠습니까?</p>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={onModalClick}>
          취소
        </button>
        <button className={styles.btn} onClick={onDeleteClickModal}>
          삭제
        </button>
      </div>
    </div>
  </div>
);

export default observer(Modal);
