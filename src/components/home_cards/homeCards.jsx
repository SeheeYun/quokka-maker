import React from 'react';
import styles from './homeCards.module.css';

const HomeCards = ({ cards, onThumbClick }) => (
  <ul className={styles.ul}>
    {cards.map(card => {
      return (
        <li key={card.id} className={styles.li} onClick={onThumbClick}>
          <img
            alt="img"
            draggable="false"
            src={process.env.PUBLIC_URL + card.mood.bgImage}
          />
        </li>
      );
    })}
  </ul>
);

export default HomeCards;
