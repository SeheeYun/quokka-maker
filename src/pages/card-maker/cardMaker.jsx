import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/header/header';
import styles from './cardMaker.module.css';
import { useLocation } from 'react-router';
import { TextareaAutosize } from '@material-ui/core';

const CardMaker = ({ store }) => {
  const location = useLocation();
  const mood = location.state ? location.state.mood : '';

  const refText = useRef();
  const dateRef = useRef();

  const [date, setDate] = useState();
  const onChange = () => {
    setDate(dateRef.current.value);
  };

  useEffect(() => {
    dateRef.current.value = new Date().toISOString().substring(0, 10);
    setDate(dateRef.current.value);
  }, []);

  const onClick = () => {
    const card = {
      date: dateRef.current.value,
      mood: mood,
      img: '',
      text: refText.current.value,
    };

    store.setCards(card);
  };

  return (
    <>
      <Header date={date} onDoneClick={onClick} />
      <ul className={styles.ul}>
        <li className={styles.li}>
          <div className={styles.div}>
            <input
              ref={dateRef}
              type="date"
              className={styles.date}
              onChange={onChange}
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
            <TextareaAutosize ref={refText} spellCheck="false" />
          </div>
          <div className={styles.btns}>
            <button className={styles.btn}>이미지 삽입</button>
            <button className={styles.btn}>이미지 삭제</button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default observer(CardMaker);
