var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var util = require('util');

var htmlfile = fs.readFileSync(__dirname + '/public/index4.html');

server = http.createServer();
server.on('request', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(htmlfile);
});

server.listen(9004);

console.log('Server runnig at http://127.0.0.1:9004/');

var socket = io.listen(server);

socket.of('/upandrun')
      .on('connection', function(client) {
        console.log('Client connected on Up and Run namespace.');
        client.send('Bienvenido a "Up and run ............"');
      });

socket.of('/clima')
      .on('connection', function(client) {
        console.log('Client connected on Clima namespace.');
        client.send('Bienvenido a "Clima ............"');
      });

/*
Uso de namespaces en socket.io, para usar varios canales
*/