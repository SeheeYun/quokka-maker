import { observer } from 'mobx-react';
import React from 'react';
import styles from './cardForm.module.css';
import { TextareaAutosize } from '@material-ui/core';
import { useState } from 'react';

const CardForm = ({ onPropsChange, card, newDate, textRef }) => {
  const { date, mood, text, fileURL } = card;

  const [previewURL, setPreviewURL] = useState(null);

  console.log(previewURL);
  const onFileChange = event => {
    event.preventDefault();

    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.div}>
        <input
          type="date"
          max={newDate}
          className={styles.date}
          defaultValue={date ? date : ''}
          onChange={e => {
            onPropsChange('date', e.target.value);
          }}
        />
        <img
          draggable="false"
          src={process.env.PUBLIC_URL + (mood ? mood.bgImage : '')}
          alt="img"
        />
        <p className={styles.p}>{mood ? mood.description : ''}</p>
        {previewURL && (
          <div className={styles.photo_wrap}>
            <div className={styles.photo}>
              <img src={previewURL} alt="img" />
            </div>
          </div>
        )}
        <TextareaAutosize
          ref={textRef}
          spellCheck="false"
          value={text ? text : ''}
          onChange={e => {
            onPropsChange('text', e.target.value);
          }}
        />
      </div>
      <div className={styles.btns}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button className={styles.btn}>이미지 삽입</button>
        <button className={styles.btn}>이미지 삭제</button>
      </div>
    </div>
  );
};

export default observer(CardForm);
