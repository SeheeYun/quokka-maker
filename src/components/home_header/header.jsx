import { observer } from 'mobx-react';
import React from 'react';
import styles from './header.module.css';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';

const Header = ({ isLoaded, uid, onLoginClick, onLogoutClick }) => {
  return (
    <header className={styles.header}>
      <button style={({ visibility: 'hidden' }, { width: '36px' })}></button>
      <img
        className={styles.logo}
        src={process.env.PUBLIC_URL + 'logo.png'}
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
  );
};

export default observer(Header);
