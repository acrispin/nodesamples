var http = require('http');

var opts = {
    host: 'snfeurlkjqweurr.com',
    port: 80,
    path: '/'
};

var req = http.get(opts, function (res) {
    console.log("Deberia ser llamado solo si la peticion es correcta");
});

req.on('error', function (e) {
    console.log('Se llamaria cuando la peticion no es correcta.');
});

/*
Uso correcto de manejo de errores con metodos asyncronos

en consola
$ node errorHandling02

*/