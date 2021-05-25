import React, { useEffect } from 'react';
import startFirebaseUI from '../../firebaseInit';
import styles from './login.module.css';

const Login = props => {
  useEffect(() => {
    startFirebaseUI('#firebaseui');
  }, []);

  return (
    <div className={styles.div}>
      <p>환영 합니다!</p>
      <div id="firebaseui"></div>
    </div>
  );
};

export default Login;
