//Node server which will handle all Socket.io connections
const io = require('socket.io')(process.env.PORT||8000,{cors : 'https://chat-box-7ht2.onrender.com'});

const users = {}


io.on('connection',socket => {
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send-message',message => {
        socket.broadcast.emit('received', {message : message,name : users[socket.id]})
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave',users[socket.id]);
        delete(users[socket.id]);
    })
});



