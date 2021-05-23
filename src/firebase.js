import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app


/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBnukS4UKEQmTjTp9ze-c8mkbXIiohaprA",
    authDomain: "crypto-e854b.firebaseapp.com",
    projectId: "crypto-e854b",
    storageBucket: "crypto-e854b.appspot.com",
    messagingSenderId: "979607024783",
    appId: "1:979607024783:web:df3b97e1a74e3b0a0a6cfa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
*/