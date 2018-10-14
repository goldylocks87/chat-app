let socket = io();

socket.on('connect', function () {
    console.log('Connected to server..');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server..');
});

socket.on('newMessage', function (message) {
    console.log(message, new Date().getMilliseconds());

    var li = jQuery('<li></li>');
        li.text(`${message.from}: (${message.createdAt}) ${message.text}`);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    console.log('submitting message...');

    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});