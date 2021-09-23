import { inject, observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/header/header';
import Cardform from '../components/cardform/cardform';
import Modal from '../components/cardMaker_modal/modal';
import { useHistory, useLocation } from 'react-router';
import { useCallback } from 'react';

const CardMaker = ({ store, imgUploader }) => {
  const textRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setLoding] = useState(false);
  const page = location.state ? location.state.page : '';

  const onModalClick = () => {
    store.onModalClick();
  };

  const onDoneClick = useCallback(() => {
    try {
      page === 'update' ? store.updateCard() : store.addCard();
      history.push('/');
    } catch (e) {
      if (e.message === 'isRedundant') {
        onModalClick();
        return;
      }
      console.log(e);
    }
  }, []);

  const onPropsChange = useCallback((name, value) => {
    store.setCardProps(name, value);
  }, []);

  const onFileChange = useCallback(async e => {
    try {
      setLoding(true);
      const uploaded = await imgUploader.upload(e.target.files[0]);
      onPropsChange('fileURL', uploaded.url);
      setLoding(false);
    } catch (e) {
      console.log(e);
      setLoding(false);
    }
  }, []);

  useEffect(() => {
    textRef.current.focus();

    switch (page) {
      case 'update':
        store.setCard(location.state.card);
        break;
      case 'add':
        const mood = location.state.mood;
        const date = new Date().toISOString().substring(0, 10);
        onPropsChange('mood', mood);
        onPropsChange('date', date);
        break;
      default:
        history.push('/');
    }

    return () => store.setCard({});
  }, []);

  return (
    <>
      {store.isModal && <Modal onModalClick={onModalClick} />}
      <Header date={store.card.date} onDoneClick={onDoneClick} />
      <Cardform
        card={store.card}
        textRef={textRef}
        isLoading={isLoading}
        onPropsChange={onPropsChange}
        onFileChange={onFileChange}
      />
    </>
  );
};

export default inject('store')(observer(CardMaker));
