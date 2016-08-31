var net = require('net');
var chatserver = net.createServer();
var clientList = [];

chatserver.on('connection', function (client){
    client.name = client.remoteAddress + ':' + client.remotePort;
    console.log(client.name + ' conectado.');
    client.write('Hola ' + client.name + '!\n');
    clientList.push(client);
    // listening para recibir mensajes del cliente
    client.on('data', function (data) {
        console.log(client.name, data.toString());
        // enviar el mensaje a todos los clientes conectados
        broadcast(data, client);
    });

    // listening para saber si un cliente se desconecto
    client.on('end', function () {
        console.log('cliente desconectado:', client.name);
        clientList.splice(clientList.indexOf(client), 1);
    });

    // listening para imprimer errores de cliente
    client.on('error', function (e) {
        console.log(e);
    });
});

function broadcast(msg, cli) {
    var cleanup = [];
    for (var i = 0; i < clientList.length; i++) {
        // para que el cliente no reciba su mismo mensaje
        if (cli !== clientList[i]) {
            // verifica el estado del cliente si puede recibir mensajes
            if (clientList[i].writable) {
                clientList[i].write(cli.name + " dice: " + msg);
            } else {
                cleanup.push(clientList[i]);
                clientList[i].destroy();
            }
        }
    }
    // eliminar todos los clientes que no esten disponibles para recivir mensajes
    for (var j = 0; j < cleanup.length; j++) {
        clientList.splice(clientList.indexOf(cleanup[j]), 1);
    };
}

chatserver.listen(9000);
console.log("Chat server started.............");

/*

se mejora function broadcast
se adiciona listening para errores de cliente

para iniciar el servidor en console
$ node chat06

para comunicarse con el server desde otra consola con telnet
$ telnet 127.0.0.1 9000

*/