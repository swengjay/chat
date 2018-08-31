var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got it!', data);
// });

$('input[name="message"]').keypress(function () {
    if ($(this).val()) {
        $("button[name='submit']").removeAttr('disabled');
    }
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');
    if(!messageTextBox.val()) {

    } else {
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function () {
            messageTextBox.val('');
            // this crap is not working
            $("button[name='submit']").prop('disabled');
        });
    }
});



