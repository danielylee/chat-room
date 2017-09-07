// jQuery code

// Opens up a socket that listens to data from server
var socket = io();

function scrollToBottom() {
  // selectors
  var msgs = $('#messages');
  var newMsg = msgs.children('li:last-child');
  // heights
  var clientHeight = msgs.prop('clientHeight');
  var scrollTop = msgs.prop('scrollTop');
  var scrollHeight = msgs.prop('scrollHeight');
  var newMsgHeight = newMsg.innerHeight();
  var lastMsgHeight = newMsg.prev().innerHeight();

  if (clientHeight + scrollTop + newMsgHeight + lastMsgHeight >= scrollHeight) {
    msgs.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);   // change to boostrap modal
      window.location.href = '/';
    } else {
      console.log('No errors');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');

  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function (msg) {
  var tmpl = $('#message-template').html();
  var html = Mustache.render(tmpl, {
    text: msg.text,
    from: msg.from,
    createdAt: msg.createdAt
  });

  $('#messages').append(html);
  scrollToBottom();
  // console.log('newMessage', msg);
  // var li = $('<li></li>');
  // li.text(`${msg.from} ${msg.createdAt}: ${msg.text}`);
  //
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function (msg) {
  var tmpl = $('#location-message-template').html();
  var html = Mustache.render(tmpl, {
    from: msg.from,
    url: msg.url,
    createdAt: msg.createdAt
  });

  $('#messages').append(html);
  scrollToBottom();
  // var li = $('<li></li');
  // var a = $('<a target="_blank">My current location</a>')
  //
  // li.text(`${msg.from}: `);
  // a.attr('href', msg.url);
  // li.append(a);
  // $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');   // Clears textbox after hit send
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not support by your browser!');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (pos) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
