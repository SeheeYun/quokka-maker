import React from 'react';
import styles from './thumbnails.module.css';
import { HashLink } from 'react-router-hash-link';
import { observer } from 'mobx-react';

const Thumbnails = ({ cards, isLoaded }) => (
  <ul className={styles.ul}>
    {isLoaded
      ? Object.keys(cards).map(key => {
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
        })
      : renderSkeleton()}
  </ul>
);

export default observer(Thumbnails);

function renderSkeleton() {
  let skeleton = [];
  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <li className={styles.li} key={i}>
        <div className={styles.skeleton} />
      </li>
    );
  }
  return skeleton;
}
