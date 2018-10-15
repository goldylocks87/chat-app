let socket = io();

socket.on('connect', function () {
    console.log('Connected to server..');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server..');
});

socket.on('newMessage', function (message) {

    var htmlMessage = jQuery('<li></li>');

    htmlMessage.text(`(${message.createdAt}) ${message.from}: ${message.text}`);

    jQuery('#messages').append(htmlMessage);
});

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault();

    var messageBox = jQuery('[name=message]');

    // send the message by emitting an event
    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val()
    }, function () {

        // clear out the users message area
        messageBox.val('');
    });
});