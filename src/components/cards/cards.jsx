import { observer } from 'mobx-react';
import React from 'react';
import styles from './cards.module.css';
import Card from '../card/card';

const Cards = ({ cards, setHeaderDate, onUpdateClick, onDeleteClick }) => (
  <div className={styles.wrapper}>
    <ul className={styles.ul}>
      {cards &&
        Object.keys(cards).map(key => (
          <Card
            card={cards[key]}
            key={key}
            setHeaderDate={setHeaderDate}
            onUpdateClick={onUpdateClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
    </ul>
  </div>
);

export default observer(Cards);
