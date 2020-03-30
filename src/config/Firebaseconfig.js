import firebase from "firebase";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyD1K0QHclnu46UPR8bHTmHw9CjLbgo6Xdg",
  authDomain: "pfe-fractal.firebaseapp.com",
  databaseURL: "https://pfe-fractal.firebaseio.com",
  projectId: "pfe-fractal",
  storageBucket: "pfe-fractal.appspot.com",
  messagingSenderId: "513414944941",
  appId: "1:513414944941:web:e189e4cff5906fe4df8e24"
  // measurementId: "G-BDQMBTDKW0"
};

const fire = firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, fire as default };
