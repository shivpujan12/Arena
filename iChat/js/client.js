const socket = io('https://chat-box-7ht2.onrender.com:8000');

const form = document.getElementById("send-container")
const msgInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('notify.mp3')

const append = (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add("message",position);
    if(position == 'left')  {
        audio.play();
    }
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send-message',message);
    msgInput.value = '';
});

const name = prompt("Enter your name to join ");
socket.emit('new-user-joined',name);

socket.on('user-joined',name => {
    append(`${name} joined the chat`,'right');
});

socket.on('received',data => {
    append(`${data.name} : ${data.message}`,'left');
});

socket.on('leave',name =>{
    append(`${name} left the chat`,'left');
});