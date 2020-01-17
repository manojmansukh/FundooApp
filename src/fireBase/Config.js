import firebase from 'firebase'
//import { Config } from '@jest/types';

const Config = {
  // apiKey: "AIzaSyBM0TlokYEGAduCBq0M1A3zQvtk30luyzg",
  // authDomain: "database-cf39b.firebaseapp.com",
  // databaseURL: "https://database-cf39b.firebaseio.com",
  // projectId: "database-cf39b",
  // storageBucket: "database-cf39b.appspot.com",
  // messagingSenderId: "1033084140808",
  // appId: "1:1033084140808:android:b120d04f032b45b2a240bd"
  apiKey: "AIzaSyBM0TlokYEGAduCBq0M1A3zQvtk30luyzg",
  authDomain: "database-cf39b.firebaseapp.com",
  databaseURL: "https://database-cf39b.firebaseio.com",
  projectId: "database-cf39b",
  storageBucket: "database-cf39b.appspot.com",
  messagingSenderId: "1033084140808",
  appId: "1:1033084140808:web:103f49087ec77afea240bd"
};
  //firebase.initializeApp(firebaseConfig);
  firebase.initializeApp(Config)
  export default firebase;