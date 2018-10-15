let socket = io();

socket.on('connect', function () {
    console.log('Connected to server..');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server..');
});

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt:  formattedTime
    });

    jQuery('#messages').append(html);
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