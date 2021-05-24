import { useEffect } from 'react';
import './app.css';
import startFirebaseUI from './firebaseInit';

function App() {
  useEffect(() => {
    startFirebaseUI('#firebaseui');
  }, []);

  return <div id="firebaseui"></div>;
}

export default App;
