import { observer } from 'mobx-react';
import React from 'react';
import styles from './cards.module.css';
import Card from '../card/card';

const Cards = ({ store, onUpdateClick, onDeleteClick }) => (
  <ul className={styles.ul}>
    {store.cards &&
      Object.keys(store.cards).map(key => (
        <Card
          store={store}
          card={store.cards[key]}
          key={key}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
  </ul>
);

export default observer(Cards);
