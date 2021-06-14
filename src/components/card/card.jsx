import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './card.module.css';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const Card = ({ store, card, onUpdateClick, onDeleteClick }) => {
  const { id, mood, text, fileURL } = card;

  const { isloaded, itemRef } = useIntersectionObserver();

  useEffect(() => {
    isloaded && store.setHeaderDate(card.date);
  }, [isloaded]);

  return (
    <li className={styles.li} id={id}>
      <div className={styles.div} ref={itemRef}>
        <div className={styles.date}>{card.date.substring(8, 11)}</div>
        <img
          draggable="false"
          src={process.env.PUBLIC_URL + mood.bgImage}
          alt="img"
        />
        <p className={styles.p}>{mood.description}</p>
        {fileURL && (
          <div className={styles.photo_wrap}>
            <div className={styles.photo}>
              <img src={fileURL} alt="img" />
            </div>
          </div>
        )}
        <p className={styles.text}>{text}</p>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={() => onUpdateClick(card)}>
          <CreateRoundedIcon fontSize="small" />
        </button>
        <button className={styles.btn} onClick={() => onDeleteClick(card)}>
          <DeleteForeverRoundedIcon fontSize="small" />
        </button>
      </div>
    </li>
  );
};

export default observer(Card);
