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

    // ON USER CONNECT //
    socket.emit('newMessage', 
        generateMessage('Admin', 'Welcome Bitch!'));

    socket.broadcast.emit('newMessage', 
        generateMessage('Admin', 'Some other muh fucka joined the chat...'));

    // ON CREATE MESSAGE //
    socket.on('createMessage', (message, callback) => {

        socket.emit('newMessage', 
            generateMessage(message.from, message.text));

        socket.broadcast.emit('newMessage', 
            generateMessage(message.from, message.text));

        if (callback)
            callback('Your message was successfully received');
    });

    // ON USER DISCONNECT //
    socket.on('disconnect', () => {

        socket.broadcast.emit('newMessage', 
        generateMessage('Admin', 'One of the other peeps left the chat...'));
    });
});

app.get('/', (req, res) => {
    res.render('index.html');
});

module.exports = { app };

server.listen(port, () => {
    console.log(`started app on port ${port}...`);
});