import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';

const Header = props => (
  <header className={styles.header}>
    <div className={styles.logo}>quokka</div>
    <button>login</button>
  </header>
);

export default observer(Header);
