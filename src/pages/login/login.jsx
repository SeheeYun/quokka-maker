import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Header from '../../components/header/header';
import styles from './login.module.css';

const Login = ({ authService }) => {
  useEffect(() => {
    authService('#firebaseui');
  }, []);

  return (
    <>
      <Header />
      <div className={styles.div}>
        <p>환영 합니다!</p>
        <div id="firebaseui"></div>
      </div>
    </>
  );
};

export default observer(Login);
