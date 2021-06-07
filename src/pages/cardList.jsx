import { inject, observer } from 'mobx-react';
import React from 'react';
import Header from '../components/header/header';
import Cards from '../components/cards/cards';
import { useHistory } from 'react-router';

const CardList = ({ store }) => {
  const history = useHistory();

  const onUpdateClick = card => {
    store.setCard(card);
    history.push({
      pathname: '/card-maker',
      state: { page: 'update' },
    });
  };

  const onDeleteClick = card => {
    store.setCard(card);
    store.deleteCard();
    store.setCard({});
  };

  return (
    <>
      <Header date={store.headerDate && store.headerDate} page={'card-list'} />
      <Cards
        store={store}
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
      />
    </>
  );
};

export default inject('store')(observer(CardList));
