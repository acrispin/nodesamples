var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var util = require('util');

var htmlfile = fs.readFileSync(__dirname + '/public/index3.html');

server = http.createServer();
server.on('request', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlfile);
});

server.listen(9003);

console.log('Server runnig at http://127.0.0.1:9003/');

var socket = io.listen(server);

socket.on('connection', function (client) {
    // console.log(client);
    console.log('Cliente connected id: ' + client.id);
    // console.log('Cliente connected handshake: ' + client.handshake);
    // http://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-js-console-log-rather-than-object
    // console.log(util.inspect(client.handshake, {showHidden: false, depth: null}));
    // console.log(util.inspect(client.handshake, false, null));
    // console.log(JSON.stringify(client.handshake, null, 4));
    // console.log(JSON.stringify(client.handshake));
    client.send('Welcome cliente ' + client.id);
});

/*
Actualizacion del server01.js, ya no se necesitaria del server02.js

en consola ejecutar
  $ node server03.js

*/