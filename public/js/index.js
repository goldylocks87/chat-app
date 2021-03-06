let socket = io();

function scrollToBottom () {

    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight 
        + scrollTop 
        + newMessageHeight 
        + lastMessageHeight >= scrollHeight) {

        messages.scrollTop(scrollHeight);
    }
}

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

    scrollToBottom();
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