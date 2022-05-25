// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMNRhFHyKwOpbNhzibci3TQLIEbljT05Q",
  authDomain: "code-challenge-ezkorp.firebaseapp.com",
  projectId: "code-challenge-ezkorp",
  storageBucket: "code-challenge-ezkorp.appspot.com",
  messagingSenderId: "292002247430",
  appId: "1:292002247430:web:e37d61044f5d53aab72487"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth()


//exports
export { db, auth }