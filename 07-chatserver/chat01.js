var net = require('net');
var chatserver = net.createServer();

chatserver.on('connection', function (client){
    client.write('Hola!\n');
    client.write('y Chau!\n');
    console.log('cliente connected: ', client.remoteAddress + ' - ' + client.remotePort);
    client.end(); // cierra conexion con el cliente
});

chatserver.listen(9000);
console.log("Chat server started.............");

/*

para iniciar el servidor en console
$ node chat01 || $ node chat01.js

para comunicarse con el server desde otra consola con telnet
$ telnet 127.0.0.1 9000
o con lo siguiente
$ telnet localhost 9000

para habilitar telnet en ubuntu
http://ubuntuguide.net/install-and-enable-telnet-server-in-ubuntu-linux
http://askubuntu.com/questions/668725/how-can-the-telnet-service-on-ubuntu-server-14-04-lts-be-enabled
*/