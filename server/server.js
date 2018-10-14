const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
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

    socket.emit('newMessage', 
        generateMessage('Admin', 'Welcome!'));

    socket.broadcast.emit('newMessage', 
        generateMessage('Admin', 'New User joined the chat...'));

    socket.on('createMessage', (message) => {
        console.log('New message...', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected...');

        socket.broadcast.emit('newMessage', 
        generateMessage('Admin', 'User left the chat...'));
    });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = { app };

server.listen(port, () => {
    console.log(`started app on port ${port}...`);
});