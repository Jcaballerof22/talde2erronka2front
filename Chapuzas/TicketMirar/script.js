document.getElementById('mostrarVentanaLangile').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'block';
});

document.getElementById('cerrarVentanaTicketMirar').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'none';
});

document.getElementById('fondoOscuroLangile').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'none';
}