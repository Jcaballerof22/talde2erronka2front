document.getElementById('mostrarVentanaGrupos').addEventListener('click', function() {
    document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
});

document.getElementById('cerrarVentanaGrupos').addEventListener('click', function() {
    ocultarVentana();
});

document.getElementById('fondoOscuroGrupos').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuroGrupos').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
}
