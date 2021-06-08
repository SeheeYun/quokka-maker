import firebase from 'firebase/app';
import firebaseApp from './firebaseInit';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const ui = new firebaseui.auth.AuthUI(firebaseApp.auth());

const authService = elementId => {
  ui.start(elementId, {
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Other config options...
  });
};

export default authService;
