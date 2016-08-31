var http = require('http');
var io = require('socket.io');

server = http.createServer();
server.on('request', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World.');
});

server.listen(9001);

console.log('Server runnig at http://127.0.0.1:9001/');

var socket = io.listen(server);

socket.on('connection', function (client) {
    // console.log(client);
    console.log('Cliente connected.' + client.id);
    client.send("Bienvenido cliente: " + client.id);
});

/*
Se tuvo que instalar paquete socket.io
Crear el file package.json
    $ npm init -y
Instalar modulo
    $ sudo npm install --save socket.io

en consola ejecutar
    $ node server01.js

ejecutar server02.js para sockets client



// https://github.com/socketio/socket.io/issues/1542
// var io          = require('socket.io')(server, {
//   'browser client minification': true,  // Send minified client
//   'browser client etag': true,          // Apply etag caching logic based on version number
//   'browser client gzip': true,          // Gzip the file
//   'browser client expires': true        // Adds Cache-Control: private, x-gzip-ok="", max-age=31536000 header
// });

// http://www.jamie-white.com/html5/setting-up-socket-io-for-production/
// socket.configure('production', function(){        
//         io.enable('browser client minification');  // send minified client
//         io.enable('browser client etag');          // apply etag caching logic based on version number
//         io.enable('browser client gzip');          // gzip the file
//         io.set('log level', 1);                    // reduce logging
//         io.set('transports', [                     // enable all transports (optional if you want flashsocket)
//             'websocket'
//           , 'flashsocket'
//           , 'htmlfile'
//           , 'xhr-polling'
//           , 'jsonp-polling'
//         ]);
//       });

*/