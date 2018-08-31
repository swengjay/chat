var socket = io();

function scrollToBottom() {
    // selector
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
       text: message.text,
       from: message.from,
       createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

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



