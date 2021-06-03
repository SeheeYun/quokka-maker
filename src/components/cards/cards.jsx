import { observer } from 'mobx-react';
import React from 'react';
import styles from './cards.module.css';
import Card from '../card/card';

const Cards = ({ cards, onUpdateClick, onDeleteClick }) => (
  <ul className={styles.ul}>
    {cards.length > 0 &&
      cards.map(card => (
        <Card
          card={card}
          key={card.id}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
  </ul>
);

export default observer(Cards);
