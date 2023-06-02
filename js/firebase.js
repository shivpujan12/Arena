
import {initializeApp}  from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {getDatabase} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyD0bctwz22Z12dfWIVLyylImlGldV8pkXc",
    authDomain: "arena-ducs.firebaseapp.com",
    databaseURL: "https://arena-ducs-default-rtdb.firebaseio.com",
    projectId: "arena-ducs",
    storageBucket: "arena-ducs.appspot.com",
    messagingSenderId: "917188227682",
    appId: "1:917188227682:web:8e19b8465af228d60b173b",
    measurementId: "G-DYW4RYL52K"
};

    const app = initializeApp(firebaseConfig);

export const db = getDatabase();
