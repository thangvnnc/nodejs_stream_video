const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const PORT = 80;

app.use(express.static(path.join(__dirname, 'public')));

io.set('origins', '*:*');

io.on('connection', (socket) => {
    console.log("client connect with id : " + socket.id);

    socket.on('register', (key) => {
        console.log("register with key : " + key);
        socket.join(key);
    });

    socket.on('message', (data) => {
        io.emit(data.to, data);
    });
});

server.listen(PORT, function (err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Server start: " + PORT);
});
