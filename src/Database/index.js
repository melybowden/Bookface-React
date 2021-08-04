import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBms4IuOMYdZzqyobKqj1g4t68QvjruhNg",
    authDomain: "bookface-df88d.firebaseapp.com",
    databaseURL: "https://bookface-df88d-default-rtdb.firebaseio.com",
    projectId: "bookface-df88d",
    storageBucket: "bookface-df88d.appspot.com",
    messagingSenderId: "1068057280002",
    appId: "1:1068057280002:web:51eba2a9d14805cd06b11b"
  };

  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  function writeUserData(userId, name, username, password) {
    firebase.database().ref('users/' + userId).set({
      username: username,
      displayname: name,
      password : password
    });
  }

const dbRef = firebase.database().ref();
dbRef.child("users").child(userId).get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
