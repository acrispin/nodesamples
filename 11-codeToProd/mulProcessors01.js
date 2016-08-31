var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

console.log('numero de cpus:', numCPUs);

if (cluster.isMaster) {
    // se hace fork de los procesos
    for(var i=0; i<numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('death', function (worker) {
        console.log('worker ' + worker.pid + ' died.');
    });
} else {
    // si no es master, cada proceso worker tiene un http server
    http.Server(function (req, res) {
        res.writeHead(200);
        res.end('Hello World \n');
    }).listen(9001);

    console.log('Server runnig at http://127.0.0.1:9001/');
}

/*
Para deployar servidor de node en un ambiente multiprocesador
distribucion de worker en todos los cpus disponibles

en consola
$ node mulProcessors01.js

*/
