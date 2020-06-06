var http = require('http');
var url = require('url');
var qs = require('querystring');

// creamos el servidor
var servidor = http.createServer(function(request, response) {
    /* ----------- obtenemos mediante el metodo GET ----------- */ 
    var respuestaGET = url.parse(request.url, true).query; // obtenemos la data por la url
    console.log('respuestaGET', respuestaGET); // mostramos la data

    /* ----------- obtenemos mediante el metodo POST ----------- */
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            // concatenmos la data a mi variable body
            body = body + data; // body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                request.connection.destroy(); // Demasiados datos POST, elimine la conexión
            }
        });

        request.on('end', function () {
            var respuestaPOST = qs.parse(body);
            console.log('repuestaPOST', respuestaPOST);
        });
    }
});

// Iniciamos el servidor en el puerto 8000
servidor.listen(8000);
console.log(' -- Servidor iniciado --')
console.log('Escuchamos http://127.0.0.1:8000')
// console.log('Escuchamos http://127.0.0.1:8000?nombre=boris&correo=boris@gmail.com')