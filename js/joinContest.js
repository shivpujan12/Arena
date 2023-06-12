import { db } from "./firebase.js";
import {
    get,
    ref,
    onValue,
    update,
    set,
    child,
    runTransaction
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
const timerDiv = document.getElementById('timerDiv');
const timerButton = document.getElementById('timer');
const waitDiv = document.getElementById('waitDiv');
const ownerDiv= document.getElementById("ownerDiv")

timerButton.addEventListener('click',startCountDown);
const contestRef = ref(db,"Contest/"+localStorage.getItem("joinContestId"));
const statusRef = ref(db, "Contest/"+localStorage.getItem("joinContestId")+"/status");
const durationRef = ref(db,"Contest/"+localStorage.getItem("joinContestId")+"/time");
const questionRef = ref(db,"Contest/"+localStorage.getItem("joinContestId")+"/Questions");

document.getElementById("contest-code").innerHTML = "<p> contest code: " +localStorage.getItem("joinContestId") + "</p><br>";

onValue(statusRef,(snapshot) => {
    const data = snapshot.val();
    onStatusChange(data).then(r => console.log("status changed"));
    console.log("status"+data);

});

onValue(contestRef,(snapshot) => {
    const data = snapshot.val();
    console.log(data.owner)
    ownerDiv.innerHTML = "<p>" + data.owner + " will start the contest" + "</p>";
});

async function onStatusChange(data) {
    console.log("inside on status change" + data);
    timerDiv.style.display = "none";
    if (data === 0) {
        onValue(contestRef, (snapshot) => {
                const data = snapshot.val();
                if (data.owner === localStorage.getItem("username")) {
                    document.getElementById('timerDiv').style.display = "block";
                    console.log("inside data 0 timer div");
                } else {
                    document.getElementById('timerDiv').style.display = "none";
                    console.log("inside  data 0 else timer div");
                }
            }
        );

    } else if (data === 1) {
        console.log('inside data 1');
        let queNum;
        await onValue(questionRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            queNum = data.length;
            console.log("queNumin onval" + queNum);
            console.log("queNum" + queNum);
            const username = localStorage.getItem("username");
            set(child(contestRef, "participants/scores/" + username), 0);
            for (let i = 1; i < queNum; i++) {
                set(child(contestRef, "participants/" + username + "/questions/" + i), "");
            }
            window.location.href = "contest.html";
        });


        // startContest();
    } else if (data === 2) {
        window.location.href = "endContest.html";
    }
}
// function addAnsPoint(id, queNumber, username) {
//     const reference = ref(db, "Contest/" + id + "/participants/" + username + "/questions");
//     set(child(reference,[queNumber]), "");
// }
async function startCountDown() {

    await update(durationRef, {"startAt": new Date().getTime()});
    update(contestRef,{"status":1});

    // database.ref('countdown').on('value',function (snapshot){
    //     const data = snapshot.val()
    //     var countDownDate = new Date(new Date().getTime() + data.endAt * 60 * 60 *1000).getTime();
    //     startTimer(countDownDate)
    // })

    // onValue(durationRef,(snapshot) => {
    //     const data = snapshot.val()
    //     var countDownDate = new Date(new Date().getTime() + data.endAt * 60 * 60 *1000).getTime();
    //     startTimer(countDownDate);
    // })
}


//Creating the Table for participants
onValue(contestRef,(snapshot) => {
    const data = snapshot.val();
    console.log(data);
    console.log("participants",participants);
})




