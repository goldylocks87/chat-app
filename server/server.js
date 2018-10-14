const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000; 
const app = express();
const server = http.createServer(app); // spin up with express app
const io = socketIO(server);

// use path to normalize
const publicPath = path.join(__dirname, '../public');

app.use( express.static(publicPath) );

// listen for an event
io.on('connection', (socket) => {
    console.log('New user connected...');

    socket.emit('newMessage',{
        from: 'noreply@its.me',
        text: 'wadeep',
        createdAt: ''
    });

    socket.on('createMessage', (message) => {
        console.log('New message...', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = { app };

server.listen(port, () => {
    console.log(`started app on port ${port}...`);
});