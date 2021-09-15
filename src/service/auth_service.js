import {
  firebaseAuth,
  emailProvider,
  googleProvider,
  githubProvider,
} from './firebaseInit';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

class AuthService {
  constructor() {
    this.uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      signInOptions: [emailProvider, googleProvider, githubProvider],
    };
    this.ui = new firebaseui.auth.AuthUI(firebaseAuth);
  }

  login(elementId) {
    this.ui.start(elementId, this.uiConfig);
  }

  logout() {
    return firebaseAuth.signOut();
  }

  onAuthStateChanged(onUserChanged) {
    firebaseAuth.onAuthStateChanged(user => {
      onUserChanged(user);
    });
  }
}
export default AuthService;
