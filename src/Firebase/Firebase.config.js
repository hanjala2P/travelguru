
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByLHAsnoYJgFUe_qU51IRmnQYtEPUN-gQ",
  authDomain: "travel-guru-91d7b.firebaseapp.com",
  projectId: "travel-guru-91d7b",
  storageBucket: "travel-guru-91d7b.firebasestorage.app",
  messagingSenderId: "87587349627",
  appId: "1:87587349627:web:7391bd30de42b05aefaede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app); 

export default app;