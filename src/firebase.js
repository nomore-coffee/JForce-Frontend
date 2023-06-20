import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBvNHppMI53DnMUD_bh0H-_tvohYaG578c",
    authDomain: "votin1.firebaseapp.com",
    projectId: "votin1",
    storageBucket: "votin1.appspot.com",
    messagingSenderId: "209444972974",
    appId: "1:209444972974:web:e1164f0ced260b5979c03f",
    measurementId: "G-P5DYQ9DRY9"
  }


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default(app)