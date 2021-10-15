import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useHistory } from 'react-router';

const Header = ({ page, isLoaded, uid, onLoginClick, onLogoutClick }) => {
  const history = useHistory();

  return page === 'home' ? (
    <header className={styles.header}>
      <button style={({ visibility: 'hidden' }, { width: '36px' })}></button>
      <img
        className={styles.logo}
        src={process.env.PUBLIC_URL + '/images/logo.png'}
        alt="logo"
      />
      {isLoaded ? (
        uid ? (
          <button onClick={onLogoutClick}>
            <MeetingRoomRoundedIcon />
          </button>
        ) : (
          <button onClick={onLoginClick}>
            <ExitToAppRoundedIcon />
          </button>
        )
      ) : (
        <div className={styles.skeleton}></div>
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
      <img
        className={styles.logo}
        src={process.env.PUBLIC_URL + '/images/logo.png'}
        alt="logo"
      />
      <button style={({ visibility: 'hidden' }, { width: '30px' })}></button>
    </header>
  );
};

export default observer(Header);
