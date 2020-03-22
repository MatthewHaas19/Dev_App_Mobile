import firebase from 'firebase/app';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBVufX48vMylrUGr8b4QJbvmEuf6gvzU3g",
    authDomain: "appli-mobile-ig.firebaseapp.com",
    databaseURL: "https://appli-mobile-ig.firebaseio.com",
    projectId: "appli-mobile-ig",
    storageBucket: "appli-mobile-ig.appspot.com",
    messagingSenderId: "571234030295",
    appId: "1:571234030295:web:9201e27a71302ff9221692",
    measurementId: "G-ZBVGHQCWYK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
    storage, firebase as default
  }
