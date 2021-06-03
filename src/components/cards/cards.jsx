import { observer } from 'mobx-react';
import React from 'react';
import styles from './cards.module.css';
import Card from '../card/card';

const Cards = ({ cards, onCardClick }) => (
  <ul className={styles.ul}>
    {cards.map(card => (
      <Card card={card} key={card.date} onCardClick={onCardClick} />
    ))}
  </ul>
);

export default observer(Cards);
