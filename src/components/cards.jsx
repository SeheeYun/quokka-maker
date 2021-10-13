import { observer } from 'mobx-react';
import React from 'react';
import Card from './card/card';

const Cards = ({ cards, setHeaderDate, onUpdateClick, onDeleteClick }) => (
  <ul>
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
);

export default observer(Cards);
