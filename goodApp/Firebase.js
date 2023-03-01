// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-vr7EW0RS1SlSjdkY_h7qvks4OLzj20I",
  authDomain: "fir-auth-bd9aa.firebaseapp.com",
  projectId: "fir-auth-bd9aa",
  storageBucket: "fir-auth-bd9aa.appspot.com",
  messagingSenderId: "500542556644",
  appId: "1:500542556644:web:89b4f1128316281121dff1"
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app()
}


const auth = firebase.auth();

export { auth }
