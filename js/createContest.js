import {db} from "./firebase.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js"//
// import firebase from "firebase/compat";
//
// const firebaseConfig = {
//     apiKey: "AIzaSyCUi4LepdVCLqQv1n-Q-qJjOhai9lGvVyA",
//     authDomain: "arena-24a34.firebaseapp.com",
//     databaseURL: "https://arena-24a34-default-rtdb.firebaseio.com",
//     projectId: "arena-24a34",
//     storageBucket: "arena-24a34.appspot.com",
//     messagingSenderId: "382143937521",
//     appId: "1:382143937521:web:ef12a00ce4448c734c6250",
//     measurementId: "G-TWD0HJL6JY"
// };
//
// const app = initializeApp(firebaseConfig);
// export const db = getDatabase();

var queNameInput = document.getElementById("queNameInput");
var queUrlInput = document.getElementById("queUrlInput");
var table = document.getElementById("table");
var addButton = document.getElementById("addButton");
var topicInput = document.getElementById("topicInput");
var timeInput = document.getElementById("timeInput");
var createButton = document.getElementById("createButton");
var popupText = document.getElementById('popupText');

addButton.addEventListener("click", addDataToTable);
function addDataToTable() {
    console.log('hello');
    var data1 = queNameInput.value;
    var data2 = queUrlInput.value;

    if (data1 && data2) {
        console.log(data1+" "+data2);
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = data1;
        cell2.innerHTML = data2;

        // Clear input values
        queNameInput.value = "";
        queUrlInput.value = "";
    }

}


document.addEventListener("DOMContentLoaded", function() {
    console.log('hello');
});


function writeUserData() {
    const reference = ref(db, "Contest");
    const constRef = push(reference)

    set(constRef, {
        owner: localStorage.getItem("username"),
        time: timeInput.value,
        topic: topicInput.value,
        status: 0 // 0 for not started, 1 for started, 2 for ended
    });

    const rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
        addQuestion(constRef.key, i, rows[i].cells[0].innerHTML, rows[i].cells[1].innerHTML);
    }
    popupText.innerHTML = constRef.key + " is your Contest ID. Store and Share it with your friends to join contest.";
    console.log(constRef.key);
    showPopup();
}

function addQuestion(id, queNumber, queName, queUrl) {
    const reference = ref(db, "Contest/" + id + "/Questions/" + queNumber);
    set(reference, {
        queName: queName,
        queUrl: queUrl
    });
}
// writeUserData(1, "10:00", "Maths");
// addQuestion(1, 1, "que 1", "https://www.google.com");
// addQuestion(1,2, "Quesasdtion 2", "https://www.google.com");
// addQuestion(1,3, "Question 3", "https://www.google.com");

createButton.addEventListener("click", writeUserData);

// popup code
function showPopup(constRef) {
    var content = document.getElementById("content");
    content.style.pointerEvents = "none"; // Disable interactions with the content
    var popup = document.getElementById("myPopup");
    popup.style.display = "block";
}

var popupButton = document.getElementById("popupButton");
popupButton.addEventListener("click", closePopup);
function closePopup() {
    window.location.href = "dashboard.html";
}
