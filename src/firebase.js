import firebase from 'firebase/compat'
// import { initializeApp } from 'firebase/app';

const config = {
    apiKey: "AIzaSyBpuES1J-qm9oQwBjHK_FlNJ_zhje3byqI",
    authDomain: "oishii-794ac.firebaseapp.com",
    projectId: "oishii-794ac",
    storageBucket: "oishii-794ac.appspot.com",
    messagingSenderId: "701810624756",
    appId: "1:701810624756:web:4dba7d8b728e466f9636a1"
}

// const app = initializeApp(config);
firebase.initializeApp(config);
export default firebase;
