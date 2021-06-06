import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Header from '../components/header/header';
import CardForm from '../components/cardForm/cardForm';
import Modal from '../components/modal/modal';
import { useHistory, useLocation } from 'react-router';

const CardMaker = ({ store }) => {
  const location = useLocation();
  const history = useHistory();
  const newDate = new Date().toISOString().substring(0, 10);

  const onChange = (name, value) => {
    store.setCardProps(name, value);
  };

  const onClick = () => {
    location.state.page === 'update' ? store.updateCard() : store.addCard();
    history.push('/');
  };

  const onModalClick = () => {
    store.onModalClick();
  };

  useEffect(() => {
    if (location.state.page === 'add') {
      const mood = location.state ? location.state.mood : '';
      const date = newDate;
      onChange('mood', mood);
      onChange('date', date);
    }

    const isRedundancyDate = store.cards.some(
      card => card.date === '2021-06-04'
    );
    if (isRedundancyDate) {
    }

    return () => store.setCard({});
  }, []);

  return (
    <>
      {store.isModal && <Modal onModalClick={onModalClick} />}
      <Header date={store.card.date} onDoneClick={onClick} />
      <CardForm card={store.card} onPropsChange={onChange} newDate={newDate} />
    </>
  );
};

export default inject('store')(observer(CardMaker));
