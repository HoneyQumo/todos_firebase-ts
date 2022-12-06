// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import _firebaseConfig from './config/firebaseConfig'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: _firebaseConfig.apiKey,
  authDomain: _firebaseConfig.authDomain,
  projectId: _firebaseConfig.projectId,
  storageBucket: _firebaseConfig.storageBucket,
  messagingSenderId: _firebaseConfig.messagingSenderId,
  appId: _firebaseConfig.appId,
  databaseURL: _firebaseConfig.databaseURL
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;