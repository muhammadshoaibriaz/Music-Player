// firebaseConfig.js
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'moodyplayer-9a296',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: '371761396787',
  appId: '1:371761396787:android:8c2cf63416f4f30b4c7746',
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
