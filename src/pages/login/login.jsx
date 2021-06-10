import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import styles from './login.module.css';

const Login = ({ authService }) => {
  useEffect(() => {
    authService.login('#firebaseui');
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.modal}>
        <img src={process.env.PUBLIC_URL + '/images/mood3.svg'} alt="img" />
        <p>WELCOME!</p>
        <div id="firebaseui" className={styles.ui}></div>
      </div>
    </div>
  );
};

export default observer(Login);
