import {db} from "./firebase.js";
import {onValue, ref} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
//
var user = document.getElementById("userInput");
var password = document.getElementById("passwordInput")
var loginButton = document.getElementById("loginButton");

function isValidUser() {
    console.log("in vaid");
    const userRef = ref(db, "Users/" + user.value + "/password");
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log("password"+password.value);
        if(data === password.value) {
            localStorage.setItem("username", user.value);
            window.location.href = "pages/dashboard.html";
            console.log("crret");
        } else {
            user.value = "";
            password.value = "";
            alert("Invalid Password/user");
        }
    });

}

loginButton.addEventListener("click", isValidUser);


