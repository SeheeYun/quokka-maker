import { inject, observer } from 'mobx-react';
import React from 'react';
import Header from '../components/header/header';
import Cards from '../components/cards/cards';

const CardList = ({ store }) => {
  const onCardClick = card => {
    store.setCard(card);
    console.log(store.card);
  };

  return (
    <>
      <Header date={store.cards[0].date} page={'card-list'} />
      <Cards cards={store.cards} onCardClick={onCardClick} />
    </>
  );
};

export default inject('store')(observer(CardList));
