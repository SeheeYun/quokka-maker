import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';

const Header = ({ page, date, onDoneClick }) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = date && date.substring(5, 7).replace(/^0/, '');
  const year = date && date.substring(0, 4);

  const onClick = () => {
    onDoneClick();
  };

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
      <div className={styles.year}>{`${monthNames[month]} ${year}`}</div>
      <button onClick={onClick}>
        <DoneRoundedIcon />
      </button>
    </header>
  );
};
export default observer(Header);
