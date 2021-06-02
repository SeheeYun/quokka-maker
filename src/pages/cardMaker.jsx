import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header/header';
import Cardform from '../components/cardform/cardform';
import { useLocation } from 'react-router';

const CardMaker = ({ store }) => {
  const location = useLocation();
  const mood = location.state ? location.state.mood : '';

  const textRef = useRef();
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
    console.log('asd');
  };

  return (
    <>
      <Header date={date} onDoneClick={onClick} />
      <Cardform
        onDateChange={onChange}
        mood={mood}
        dateRef={dateRef}
        textRef={textRef}
      />
    </>
  );
};

export default inject('store')(observer(CardMaker));
