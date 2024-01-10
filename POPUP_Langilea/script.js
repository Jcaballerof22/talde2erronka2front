document.getElementById('mostrarVentana').addEventListener('click', function() {
    document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergente').style.display = 'block';
});

document.getElementById('cerrarVentana').addEventListener('click', function() {
    document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergente').style.display = 'none';
});

document.getElementById('fondoOscuro').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergente').style.display = 'none';
}