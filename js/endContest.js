import {get, onValue, ref} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {db} from "./firebase.js";

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
document.getElementById("doneButton").addEventListener("click", () => {
    window.location.href="pages/dashboard.html";
});