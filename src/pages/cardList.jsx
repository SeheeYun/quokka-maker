import { inject, observer } from 'mobx-react';
import React from 'react';
import Header from '../components/header/header';
import Cards from '../components/cards/cards';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import Modal from '../components/cardList_modal/modal';

const CardList = ({ store }) => {
  const history = useHistory();

  const onModalClick = () => {
    store.onModalClick();
  };

  const onUpdateClick = card => {
    history.push({
      pathname: '/card-maker',
      state: { page: 'update', card: card },
    });
  };

  const onDeleteClick = card => {
    store.setCard(card);
    onModalClick();
  };

  const onDeleteClickModal = () => {
    onModalClick();
    store.deleteCard();
  };

  const setHeaderDate = date => {
    store.setHeaderDate(date);
  };

  useEffect(() => {
    const stopCard = store.setCards();

    return () => {
      stopCard();
      store.setCard({});
    };
  }, []);

  return (
    <>
      <Header date={store.headerDate} page={'card-list'} />
      <Cards
        cards={store.cards}
        setHeaderDate={setHeaderDate}
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
      />
      {store.isModal && (
        <Modal
          onModalClick={onModalClick}
          onDeleteClickModal={onDeleteClickModal}
        />
      )}
    </>
  );
};

export default inject('store')(observer(CardList));
