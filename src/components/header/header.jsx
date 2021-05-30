import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';

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
        <ArrowBackIosRoundedIcon fontSize="small" />
      </button>
      <div>January 2021</div>
      <button>
        <DoneRoundedIcon />
      </button>
    </header>
  );
};
export default observer(Header);
