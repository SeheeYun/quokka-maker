import firebase from 'firebase/app';
import firebaseApp from './firebaseInit';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

class AuthService {
  constructor() {
    this.uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      // callbacks: {
      //   signInSuccessWithAuthResult: () => false,
      // },
    };
    this.ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
  }

  login(elementId) {
    this.ui.start(elementId, this.uiConfig);
  }

  logout() {
    return firebaseApp.auth().signOut();
  }

  onAuthStateChanged(onUserChanged) {
    firebaseApp.auth().onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }
}
export default AuthService;
