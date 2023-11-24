// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
//import {getAuth} from 'firebase/auth'
//import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZkVWUuv-w6ewywKxZgbjLzwEvNFYlSCw",
    authDomain: "momo-api-hacks-bqjl.firebaseapp.com",
    databaseURL: "https://momo-api-hacks-bqjl-default-rtdb.firebaseio.com",
    projectId: "momo-api-hacks-bqjl",
    storageBucket: "momo-api-hacks-bqjl.appspot.com",
    messagingSenderId: "600773229780",
    appId: "1:600773229780:web:bf29081631be8cc4e14f41",
    measurementId: "G-2Q6X1B845J"
  };

// Initialize Firebase
const App = initializeApp(firebaseConfig);


export const firebaseDb = getFirestore()

//export const auth = getAuth() 
//export const storage = getStorage() 
