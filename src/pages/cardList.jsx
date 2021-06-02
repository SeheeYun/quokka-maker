import { inject, observer } from 'mobx-react';
import React from 'react';
import Header from '../components/header/header';
import Cards from '../components/cards/cards';

const CardList = ({ store }) => {
  return (
    <>
      <Header date={store.cards[0].date} page={'card-list'} />
      <Cards cards={store.cards} />
    </>
  );
};

export default inject('store')(observer(CardList));
