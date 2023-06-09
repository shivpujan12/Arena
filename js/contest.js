import {db} from "./firebase.js";
import {ref, onValue, set, get} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


const durationRef = ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/time");
var numRows = 5;

// Create the table element
var table = document.createElement('table');

// Create the table header
var thead = document.createElement('thead');
var headerRow = document.createElement('tr');

var col1Header = document.createElement('th');
col1Header.textContent = 'Que. No.';

var col2Header = document.createElement('th');
col2Header.textContent = 'Question';

var col3Header = document.createElement('th');
col3Header.textContent = 'Answer';

var col4Header = document.createElement('th');
col4Header.textContent = 'Done';

headerRow.appendChild(col1Header);
headerRow.appendChild(col2Header);
headerRow.appendChild(col3Header);
headerRow.appendChild(col4Header);

thead.appendChild(headerRow);
table.appendChild(thead);
var tbody = document.createElement('tbody');

get(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/Questions")).then( (snapshot) => {
    const data = snapshot.val();
    var dataStr = JSON.stringify(data);

    get(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/participants/" + localStorage.getItem('username'))).then( (snapshot) => {
        const participantData = snapshot.val();
        console.log("participantData" + participantData);
        const numRows = participantData["questions"].length;
        console.log("numRows" + numRows);
        for (var i = 1; i < numRows; i++) {
            var row = document.createElement('tr');

            var queNo = document.createElement('td');
            queNo.textContent = i;

            var queName = document.createElement('td');
            var queUrl = document.createElement('a');
            queUrl.href = data[i + ""]["queUrl"];
            queUrl.textContent = data[i + ""]["queName"];
            queUrl.target = "_blank";
            queName.appendChild(queUrl);

            var answer = document.createElement('td');
            var inputAns = document.createElement('input');
            var status = document.createElement('td');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            if (participantData["questions"][i + ""] !== "") {
                inputAns.value = participantData["questions"][i + ""];
                inputAns.disabled = true;
                checkbox.disabled = true;
            }
            status.appendChild(checkbox);
            answer.appendChild(inputAns);

            row.appendChild(queNo);
            row.appendChild(queName);
            row.appendChild(answer);
            row.appendChild(status);

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        document.getElementById('contestDiv').appendChild(table);

    });
});

startContest();
// Add the table to the document body
const contestDiv = document.getElementById('contestDiv');
table.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {

        var row = e.target.parentNode.parentNode;
        var cells = row.querySelectorAll('td');
        var queNo = cells[0].textContent;
        if(cells[2].querySelector('input').value === "") {
            alert("Please enter answer");
            cells[3].querySelector('input').checked = false;
        }
        else {
            const ans = cells[2].querySelector('input').value;
            console.log(queNo);
            console.log(ans);
            get(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/participants/" + localStorage.getItem('username'))).then((snapshot) => {
                const participantData = snapshot.val();
                console.log("participantData"+participantData);
                participantData["questions"][queNo] = ans;
                console.log(participantData);
                set(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/participants/" + localStorage.getItem('username')), participantData);
            });
            get(ref(db,"Contest/"+localStorage.getItem("joinContestId")+"/participants/scores/"+localStorage.getItem('username'))).then((snapshot) => {
                let scoreData = snapshot.val();
                scoreData++;
                set(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/participants/scores/" + localStorage.getItem('username')), scoreData);
            });
            row.querySelector('input').disabled = true;
            cells[3].querySelector('input').disabled = true;
        }


    }
});



function startTimer(countDownDate) {
    let x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count-down date
        var distance = countDownDate - now;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("timerDiv").innerHTML = '<div id="timer">' + hours + "h "
            + minutes + "m " + seconds + "s " + '</div>';



        // If the count-down is over, write some text
        console.log(distance)
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("timerDiv").innerHTML = 'time end';
            set(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/status"),2);
            window.location.href = "pages/endContest.html";
        }
    }, 1000);
}

function startContest() {

    onValue(durationRef, (snapshot) => {
        const data = snapshot.val()
        console.log(data);
        var countDownDate = new Date(data.startAt + data.endAt * 60 * 60 *1000).getTime();
        startTimer(countDownDate);
    })
}

//---------------

var lbTable = document.createElement('table');

// Create the table header
var lbThead = document.createElement('thead');
var lbHeaderRow = document.createElement('tr');

var lbCol1Header = document.createElement('th');
lbCol1Header.textContent = 'User';

var lbCol2Header = document.createElement('th');
lbCol2Header.textContent = 'Score';

lbHeaderRow.appendChild(lbCol1Header);
lbHeaderRow.appendChild(lbCol2Header);

lbThead.appendChild(lbHeaderRow);
lbTable.appendChild(lbThead);

// Create the table body
var lbTbody = document.createElement('tbody');

onValue(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/participants/scores"), (snapshot) => {
    fillLeaderBoard();
});

function fillLeaderBoard() {
    get(ref(db, "Contest/" + localStorage.getItem("joinContestId") + "/participants/scores")).then( (snapshot) => {
        const data = snapshot.val();
        var dataStr = JSON.stringify(data);
        console.log(dataStr);
        var sortedData = Object.entries(data).sort((a,b) => b[1] - a[1]);
        console.log(sortedData);
        while(lbTbody.firstChild) {
            lbTbody.removeChild(lbTbody.firstChild);
        }
        for (var i = 0; i < sortedData.length; i++) {
            var row = document.createElement('tr');

            var user = document.createElement('td');
            user.textContent = sortedData[i][0];

            var score = document.createElement('td');
            score.textContent = sortedData[i][1];

            row.appendChild(user);
            row.appendChild(score);

            lbTbody.appendChild(row);
        }

        lbTable.appendChild(lbTbody);
        document.getElementById('leaderboardDiv').appendChild(lbTable);
    });
}
