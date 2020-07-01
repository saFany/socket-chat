var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y/o sala son necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};
socket.on('connect', function() {
    socket.emit('entrarChat', usuario, function(resp) {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/*socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log(mensaje);
});

socket.on('listaPersonas', function(lista) {
    console.log(lista);
});

//Mensaje privado
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensaje privado: ');
    console.log(mensaje);
});