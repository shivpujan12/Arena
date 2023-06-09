import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
//
var joinInput = document.getElementById("joinInput");
var createButton = document.getElementById("createButton")
var joinButton = document.getElementById("joinButton");
var greet = document.getElementById("greet");

greet.innerHTML = "Welcome "+localStorage.getItem("username");
function join() {
    if(joinInput.value !== "") {
        console.log("in vaid");
        const contestRef = ref(db,"Contest/"+joinInput.value);
        onValue(contestRef,(snapshot) => {
            if(snapshot.exists()) {
                localStorage.setItem("joinContestId",joinInput.value);
                window.location.href="pages/joinContest.html";
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
    window.location.href="pages/createContest.html";
}

joinButton.addEventListener("click", join);
createButton.addEventListener("click", create);