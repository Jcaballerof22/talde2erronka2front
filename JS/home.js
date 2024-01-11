document.getElementById('editarHorarios').addEventListener('click', function() {
    document.getElementById('tablaHorarios').style.display = 'block';
    document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
    // window.alert('aaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAA');
})

document.getElementById('cerrarHorarios').addEventListener('click', function() {
    document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
    document.getElementById('tablaHorarios').style.display = 'none';
});

document.getElementById('fondoOscuro').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
    document.getElementById('tablaHorarios').style.display = 'none';
}