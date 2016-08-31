var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 9002));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/*
Se tuvo que instalar paquete express
  $ sudo npm install --save express

en consola ejecutar
  $ node server02.js

ejecutar server01.js para sockets server    

*/