import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import Header from '../components/header/header';
import CardForm from '../components/cardForm/cardForm';
import Modal from '../components/modal/modal';
import { useHistory, useLocation } from 'react-router';

const CardMaker = ({ store, imgUploader }) => {
  console.log(store.card);
  const textRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const newDate = new Date().toISOString().substring(0, 10);

  const onModalClick = () => {
    store.onModalClick();
  };

  const onDoneClick = () => {
    try {
      location.state.page === 'update' ? store.updateCard() : store.addCard();
      history.push('/');
    } catch {
      onModalClick();
    }
  };

  const onPropsChange = (name, value) => {
    store.setCardProps(name, value);
  };

  const onFileChange = async e => {
    const uploaded = await imgUploader.upload(e.target.files[0]);
    onPropsChange('fileURL', uploaded.url);
  };

  useEffect(() => {
    textRef.current.focus();

    if (location.state.page === 'add') {
      const mood = location.state ? location.state.mood : '';
      const date = newDate;
      onPropsChange('mood', mood);
      onPropsChange('date', date);
    }

    return () => store.setCard({});
  }, []);

  return (
    <>
      {store.isModal && <Modal onModalClick={onModalClick} />}
      <Header date={store.card.date} onDoneClick={onDoneClick} />
      <CardForm
        card={store.card}
        newDate={newDate}
        textRef={textRef}
        onPropsChange={onPropsChange}
        onFileChange={onFileChange}
      />
    </>
  );
};

export default inject('store')(observer(CardMaker));
