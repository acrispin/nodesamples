var net = require('net');
var chatserver = net.createServer();
var clientList = [];

chatserver.on('connection', function (client){
    client.name = client.remoteAddress + ':' + client.remotePort;
    client.write('Hola ' + client.name + '!\n');
    clientList.push(client);
    client.on('data', function (data) {
        console.log(client.name, data.toString());
        // enviar el mensaje a todos los clientes conectados
        broadcast(data, client);
    });
});

function broadcast(msg, cli) {
    for (var i = 0; i < clientList.length; i++) {
        // para que el cliente no reciba su mismo mensaje
        if (cli !== clientList[i]) {
            // no se controla error si cliente se desconecta, lanzaria erorr y el server se caeria
            clientList[i].write(cli.name + " dice: " + msg);
        }
    }
}

chatserver.listen(9000);
console.log("Chat server started.............");

/*

se mejora la comunicacion entre los clientes

para iniciar el servidor en console
$ node chat04

para comunicarse con el server desde otra consola con telnet
$ telnet 127.0.0.1 9000

*/