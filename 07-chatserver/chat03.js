var net = require('net');
var chatserver = net.createServer();
var clientList = [];

chatserver.on('connection', function (client){
    client.write('Hola!\n');
    clientList.push(client);
    client.on('data', function (data) {
        console.log(data.toString());
        // enviar el mensaje a todos los clientes conectados
        for(var i=0; i<clientList.length; i++){
            // no se controla error si cliente se desconecta, lanzaria erorr y el server se caeria
            clientList[i].write(data);
        }
    });
});

chatserver.listen(9000);
console.log("Chat server started.............");

/*

se implementa funcion para comunicacion entre clientes

para iniciar el servidor en console
$ node chat03

para comunicarse con el server desde otra consola con telnet
$ telnet 127.0.0.1 9000

*/