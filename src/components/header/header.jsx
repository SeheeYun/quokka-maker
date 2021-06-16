import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import { useHistory } from 'react-router';

const Header = ({
  page,
  date,
  onDoneClick,
  onLoginClick,
  onLogoutClick,
  uid,
}) => {
  const history = useHistory();

  return page === 'home' ? (
    <header className={styles.header}>
      <button style={({ visibility: 'hidden' }, { width: '36px' })}></button>
      <div className={styles.logo}>quokka</div>
      {uid ? (
        <button onClick={onLogoutClick}>
          <MeetingRoomRoundedIcon />
        </button>
      ) : (
        <button onClick={onLoginClick}>
          <ExitToAppRoundedIcon />
        </button>
      )}
    </header>
  ) : (
    <header className={styles.header}>
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        <ArrowBackIosRoundedIcon fontSize="small" />
      </button>
      <div className={styles.year}>{date ? getDate(date) : ''}</div>
      <button
        onClick={onDoneClick}
        style={{ visibility: page === 'card-list' && 'hidden' }}
      >
        <DoneRoundedIcon />
      </button>
    </header>
  );
};

function getDate(date) {
  const monthNames = [
    '',
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

  return `${monthNames[month]} ${year}`;
}

export default observer(Header);
