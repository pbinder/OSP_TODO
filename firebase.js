// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const firebaseConfig = {
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCrzuJb8DIKFYEsEuyWIMMOqFara6a0nK4",
  authDomain: "todo-app-d53d9.firebaseapp.com",
  projectId: "todo-app-d53d9",
  storageBucket: "todo-app-d53d9.appspot.com",
  messagingSenderId: "933446065871",
  appId: "1:933446065871:web:cc1b75db2b8e2d789921ba",
  measurementId: "G-K321QW718T"
});
  //};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = firebaseApp.firestore();
export default db;