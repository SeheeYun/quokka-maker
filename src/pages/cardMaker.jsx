import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import Header from '../components/header/header';
import CardForm from '../components/cardForm/cardForm';
import { useLocation } from 'react-router';

const CardMaker = ({ store }) => {
  const location = useLocation();

  const textRef = useRef();
  const dateRef = useRef();

  const onChange = (name, value) => {
    store.setCardProps(name, value);
  };

  useEffect(() => {
    if (Object.keys(store.card).length === 0) {
      const mood = location.state ? location.state.mood : '';
      const date = new Date().toISOString().substring(0, 10);
      onChange('mood', mood);
      onChange('date', date);
    }

    return () => store.setCard({});
  }, []);

  const onClick = () => {
    console.log('asd');
  };

  return (
    <>
      <Header date={store.card.date} onDoneClick={onClick} />
      <CardForm card={store.card} dateRef={dateRef} textRef={textRef} />
    </>
  );
};

export default inject('store')(observer(CardMaker));
