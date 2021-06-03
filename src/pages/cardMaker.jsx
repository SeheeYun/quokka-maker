import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Header from '../components/header/header';
import CardForm from '../components/cardForm/cardForm';
import { useHistory, useLocation } from 'react-router';

const CardMaker = ({ store }) => {
  const location = useLocation();
  const history = useHistory();

  const onChange = (name, value) => {
    store.setCardProps(name, value);
  };

  const onClick = () => {
    location.state.page === 'update' ? store.updateCard() : store.addCard();
    console.log(store.cards);
    history.push('/');
  };

  useEffect(() => {
    if (location.state.page === 'add') {
      const mood = location.state ? location.state.mood : '';
      const date = new Date().toISOString().substring(0, 10);
      onChange('mood', mood);
      onChange('date', date);
    }

    return () => store.setCard({});
  }, []);

  return (
    <>
      <Header date={store.card.date} onDoneClick={onClick} />
      <CardForm card={store.card} onPropsChange={onChange} />
    </>
  );
};

export default inject('store')(observer(CardMaker));
