import { observer } from 'mobx-react';
import React from 'react';
import styles from './cards.module.css';
import Card from '../card/card';

const Cards = ({ cards }) => (
  <ul className={styles.ul}>
    {cards.map(card => (
      <Card card={card} key={card.date} />
    ))}
  </ul>
);

export default observer(Cards);
