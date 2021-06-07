import { observer } from 'mobx-react';
import React from 'react';
import styles from './cards.module.css';
import Card from '../card/card';

const Cards = ({ store, onUpdateClick, onDeleteClick }) => (
  <ul className={styles.ul}>
    {store.cards.length > 0 &&
      store.cards.map(card => (
        <Card
          store={store}
          card={card}
          key={card.id}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
  </ul>
);

export default observer(Cards);
