var http = require('http');

var opts = {
    host: 'snfeurlkjqweurr.com',
    port: 80,
    path: '/'
};

try{
    http.get(opts, function (res) {
        console.log('No deberia ser llamado');
    });
} catch(e) {
    console.log('error en peticion');
}

/*
En este caso el bloque try no funciona, ya que http.get al ser asyncrono se ejecuta
normalmente y sale del bloque try, el error se produce en la funcion callback

en consola
$ node errorHandling01

*/