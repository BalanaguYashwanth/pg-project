import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyCiXmndfIr6bGr1h4GjLM6moFJ6WzFKH4w",
    authDomain: "pg-app-fd8a7.firebaseapp.com",
    databaseURL: "https://pg-app-fd8a7.firebaseio.com",
    projectId: "pg-app-fd8a7",
    storageBucket: "pg-app-fd8a7.appspot.com",
    messagingSenderId: "967373924042",
    appId: "1:967373924042:web:60124a8491144fa4f8b633",
    measurementId: "G-3578WF0JJE"
  }

  
  


  const fb = firebase.initializeApp(config)
  var db = firebase.firestore();
  //Timestamp = firebase.firestore.Timestamp;
  //const db= firebase.firestore()
  
  export{fb,db}
  
  
