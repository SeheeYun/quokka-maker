import { observer } from 'mobx-react';
import React from 'react';
import styles from './cardform.module.css';
import { TextareaAutosize } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Cardform = ({
  card,
  textRef,
  isLoading,
  onPropsChange,
  onFileChange,
}) => {
  const { date, mood, text, fileURL } = card;

  return (
    <>
      <div className={styles.div}>
        <DatePicker
          className={styles.date}
          dateFormat="dd"
          selected={date && new Date(date)}
          maxDate={new Date()}
          onChange={date => {
            onPropsChange(
              'date',
              new Date(date).toISOString().substring(0, 10)
            );
          }}
        />
        <img
          draggable="false"
          src={process.env.PUBLIC_URL + (mood ? mood.bgImage : '')}
          alt="img"
        />
        <p className={styles.p}>{mood ? mood.description : ''}</p>
        {fileURL && (
          <div className={styles.photo_wrap}>
            <div className={styles.photo}>
              <img src={fileURL} alt="img" />
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
        {isLoading ? (
          <div className={styles.btn}>
            <div className={styles.spinner} />
          </div>
        ) : (
          <label className={styles.btn} htmlFor="input_file">
            이미지 추가
          </label>
        )}
        <input
          type="file"
          accept="image/*"
          id="input_file"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <button
          className={styles.btn}
          onClick={() => {
            onPropsChange('fileURL', '');
          }}
        >
          이미지 삭제
        </button>
      </div>
    </>
  );
};

export default observer(Cardform);
