async function b() {
    fetch('../../talde2erronka2back/Erronka2/public/api/alumnos', { method: 'GET'})
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            for (let i = 0; i < data.length; i++) {
                // Obtén la referencia de la tabla por su id
                var tabla = document.getElementById("tabla");

                // Agrega una fila a la tabla
                var fila = tabla.insertRow();
    
                // Agrega celdas a la fila
                var celdaNombre = fila.insertCell(0);
                var celdaNumeroAlumnos = fila.insertCell(1);
    
                // Agrega contenido a las celdas
                celdaNombre.innerHTML = data[i].izena + " " + data[i].abizena;
                celdaNumeroAlumnos.innerHTML = data[i].taldea;
            }
        });
}

b();

document.getElementById('mostrarVentanaLangile').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'block';
});

document.getElementById('cerrarVentanaLangile').addEventListener('click', function() {
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