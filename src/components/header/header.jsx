import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';

const Header = ({ page }) => {
  return page ? (
    <header className={styles.header}>
      <button style={{ visibility: 'hidden' }}>back</button>
      <div className={styles.logo}>quokka</div>
      <button>login</button>
    </header>
  ) : (
    <header className={styles.header}>
      <button>back</button>
      <div>January 2021</div>
      <button>check</button>
    </header>
  );
};
export default observer(Header);
