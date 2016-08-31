var net = require('net');
var chatserver = net.createServer();
var clientList = [];

chatserver.on('connection', function (client){
    client.name = client.remoteAddress + ':' + client.remotePort;
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
});

function broadcast(msg, cli) {
    for (var i = 0; i < clientList.length; i++) {
        // para que el cliente no reciba su mismo mensaje
        if (cli !== clientList[i]) {            
            clientList[i].write(cli.name + " dice: " + msg);
        }
    }
}

chatserver.listen(9000);
console.log("Chat server started.............");

/*

se mejora para evitar error cuando un cliente se desconecta
se agrega metodo para saber si un cliente se desconecta

para iniciar el servidor en console
$ node chat05

para comunicarse con el server desde otra consola con telnet
$ telnet 127.0.0.1 9000

*/