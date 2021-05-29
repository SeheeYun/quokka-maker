import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';
import {
  ExitToAppRoundedIcon,
  MeetingRoomRoundedIcon,
  ArrowBackIosRoundedIcon,
  DoneRoundedIcon,
} from '@material-ui/icons';

const Header = ({ page }) => {
  return page ? (
    <header className={styles.header}>
      <button style={{ visibility: 'hidden' }}>back</button>
      <div className={styles.logo}>quokka</div>
      <button>
        <ExitToAppRoundedIcon />
      </button>
    </header>
  ) : (
    <header className={styles.header}>
      <button>
        <ArrowBackIosRoundedIcon />
      </button>
      <div>January 2021</div>
      <button>
        <DoneRoundedIcon />
      </button>
    </header>
  );
};
export default observer(Header);
