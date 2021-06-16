import React from 'react';
import styles from './thumbnails.module.css';
import { HashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react';

const Thumbnails = ({ cards }) => (
  <ul className={styles.ul}>
    {cards &&
      Object.keys(cards).map(key => {
        const card = cards[key];
        return (
          <li className={styles.li} key={key}>
            <HashLink
              to={'/card-list#' + card.id}
              scroll={el => el.scrollIntoView({ block: 'center' })}
            >
              <img
                alt="img"
                draggable="false"
                src={process.env.PUBLIC_URL + card.mood.bgImage}
              />
            </HashLink>
          </li>
        );
      })}
  </ul>
);

export default observer(Thumbnails);
