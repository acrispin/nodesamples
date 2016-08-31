var net = require('net');
var chatserver = net.createServer();

chatserver.on('connection', function (client){
    client.write('Hola!\n');
    client.on('data', function (data) {
        console.log(data);
        console.log(data.toString());
    });
});

chatserver.listen(9000);
console.log("Chat server started.............");

/*

se implementa funcion para escuchar al cliente e imprimir la data que envia al server
no se cierra conexion con el cliente

para iniciar el servidor en console
$ node chat02

para comunicarse con el server desde otra consola con telnet
$ telnet 127.0.0.1 9000

*/