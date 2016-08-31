var http = require('http');

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World \n');
    // console.log(req);
}).listen(8124, '127.0.0.1');

console.log('Server runnig at http://127.0.0.1:8124/');

/*

en consola ejecutar
$ node index.js

o tambien
$ node index

*/