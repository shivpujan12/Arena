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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()

//two hrs


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
        document.getElementById("timer_div").innerHTML = '<div id="timer">' + hours + "h "
            + minutes + "m " + seconds + "s " + '</div>';

        document.getElementById('timer-end-alert').style.display = 'none'

        // If the count-down is over, write some text
        console.log(distance)
        if (distance < 0) {
            clearInterval(x);
            document.getElementById('timer-end-alert').style.display = 'block'
            document.getElementById("timer_div").innerHTML = "<button id='timer' onclick='startCountDown()'>Start Timer</button>";
        }
    }, 1000);
}

function startCountDown(){
    const database = firebase.database();
    const ref = database.ref("countdown");
    ref.set({
        startAt: new Date().getTime(),
        endAt: 1
    });

    database.ref('countdown').on('value',function (snapshot){
        const data = snapshot.val()
        var countDownDate = new Date(new Date().getTime() + data.endAt * 60 * 60 *1000).getTime();
        startTimer(countDownDate)
    })

    startTimer()
}

//get data from database
get();

function get() {
    const user_ref = database.ref('Score');
    user_ref.on('value', function(snapshot) {
        const data = snapshot.val();
        console.log(data);
        document.getElementById("player-one-score").innerText = data.Rishi;
        document.getElementById("player-two-score").innerText = data.Shivpujan;
        document.getElementById("player-three-score").innerText = data.Rohit;
        document.getElementById("player-four-score").innerText = data.Navneet;
        document.getElementById('alert').style.display = 'none';
    })

    database.ref('countdown').on('value',function (snapshot){
        const data = snapshot.val()
        var countDownDate = new Date(data.startAt + data.endAt * 60 * 60 *1000).getTime();
        startTimer(countDownDate)
    })
}

function one_incr() {
    let player_one_score = document.getElementById('player-one-score').innerText;

    player_one_score = String(parseInt(player_one_score) + 1)

    const updates = {
        Rishi: player_one_score,
    };
    database.ref('Score').update(updates)
    document.getElementById('alert').style.display = 'block';
    get();
}

function two_incr() {
    let player_two_score = document.getElementById('player-two-score').innerText;
    player_two_score = String(parseInt(player_two_score) + 1)

    const updates = {
        Shivpujan: player_two_score
    };
    database.ref('Score').update(updates)
    document.getElementById('alert').style.display = 'block';
    get();
}

function three_incr() {
    let player_two_score = document.getElementById('player-three-score').innerText;
    player_two_score = String(parseInt(player_two_score) + 1)

    const updates = {
        Rohit: player_two_score
    };
    database.ref('Score').update(updates)
    document.getElementById('alert').style.display = 'block';
    get();
}

function four_incr() {
    let player_two_score = document.getElementById('player-four-score').innerText;
    player_two_score = String(parseInt(player_two_score) + 1)

    const updates = {
        Navneet: player_two_score
    };
    database.ref('Score').update(updates)
    document.getElementById('alert').style.display = 'block';
    get();
}

function updateLink(e,e1) {
    var btn = document.getElementById(e);
    var link = document.getElementById(e1);
    console.log(btn,link)
    if(link.value === ""){
        alert("Please enter a valid link");
    } else {
        if(e.includes('p1')){
            one_incr();
        } else if(e.includes('p2')){
            two_incr();
        } else if(e.includes('p3')){
            three_incr();
        } else {
            four_incr();
        }
        btn.style.visibility = 'hidden';
    }

}


