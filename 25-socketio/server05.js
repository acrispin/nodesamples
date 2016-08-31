
var http = require('http');
var app = require('express')();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.set('port', (process.env.PORT || 9005));

server.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index5.html');
});

app.get('/test', function (req, res) {
    // io.sockets.emit('all-msg', "mensaje para todos");
    io.emit('all-msg', "mensaje para todos"); // lo mismo que la sentencia anterior
    res.send('Hello World');
});

app.get('/test2', function (req, res) {
    // sending to all clients in namespace 'nsp01', include sender
    io.of('nsp01').emit('msg-nsp', 'mensaje solo para el namespace');
    res.send('Hello World 2');
});

app.get('/test3', function (req, res) {
    // sending to all clients in 'room01' room(channel), include sender
    io.of('nsp01').in('room01').emit('msg-room', 'mensaje solo para el room');
    res.send('Hello World 3');
});


io.of('/nsp01')
    .on('connection', function (socket) {
        socket.join('room01'); // se une al canal
        socket.emit('news', 
            {
                title: 'Welcome to News.',
                contents: 'This news was sent form server nodejs.',
                allowRes: true
            }
        );
        socket.on('scoop', function(input) {
            socket.emit('news', 
                {
                    title: 'Test received message',
                    contents: 'Content received successful.....'
                }
            );
        });
    });


/*
SocketIO with Express, uso de namespace y rooms o canales

http://socket.io/docs/rooms-and-namespaces/
http://stackoverflow.com/questions/10930286/socket-io-rooms-or-namespacing
http://stackoverflow.com/questions/10058226/send-response-to-all-clients-except-sender-socket-io

// sending to sender-client only
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
socket.broadcast.to(socketid).emit('message', 'for your eyes only');

*/