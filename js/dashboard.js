import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
//
var joinInput = document.getElementById("joinInput");
var createButton = document.getElementById("createButton")
var joinButton = document.getElementById("joinButton");
var greet = document.getElementById("greet");

greet.innerHTML = "Welcome "+localStorage.getItem("user");
function join() {
    if(joinInput.value !== "") {
        console.log("in vaid");
        const contestRef = ref(db,"Contest/"+joinInput.value);
        onValue(contestRef,(snapshot) => {
            if(snapshot.exists()) {
                localStorage.setItem("contestId",joinInput.value);
                window.location.href="contest.html";
            }
            else {
                alert("Invalid Contest ID");
            }

        });
    }
    else {
        alert("Invalid Contest ID");
    }

}

function create() {
    window.location.href="createContest.html";
}

joinButton.addEventListener("click", join);
createButton.addEventListener("click", create);