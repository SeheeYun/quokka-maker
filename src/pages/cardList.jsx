import { inject, observer } from 'mobx-react';
import React from 'react';
import Header from '../components/header_card/header';
import Cards from '../components/cards';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import Modal from '../components/modal_cardList/modal';

const CardList = ({ store }) => {
  const history = useHistory();

  const onUpdateClick = card => {
    if (!store.uid) {
      history.push('/login');
      return;
    }

    history.push({
      pathname: '/card-maker',
      state: { page: 'update', card: card },
    });
  };

  const onDeleteClick = card => {
    if (!store.uid) {
      history.push('/login');
      return;
    }

    store.setCard(card);
    onModalClick();
  };

  const onModalClick = () => {
    store.onModalClick();
  };

  const onDeleteClickModal = () => {
    store.deleteCard();
  };

  const setHeaderDate = date => {
    store.setHeaderDate(date);
  };

  useEffect(() => {
    const stopCards = store.setCards();

    return () => {
      stopCards();
      store.setCard({});
    };
  }, []);

  return (
    <>
      <Header page={history.location.pathname} date={store.headerDate} />
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
