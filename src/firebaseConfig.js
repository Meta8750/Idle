import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyB66qheyJnSmdN2NkFN4Z8fi6p2dA7MF5A",
    authDomain: "animons-d17b9.firebaseapp.com",
    projectId: "animons-d17b9",
    storageBucket: "animons-d17b9.appspot.com",
    messagingSenderId: "495536307050",
    appId: "1:495536307050:web:b8a33e2d3fe811aee90313",
    measurementId: "G-JP5LJH3QCB"
  }; 
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  export { db };