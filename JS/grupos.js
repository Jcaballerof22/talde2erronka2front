async function a() {
    fetch('http://localhost/Cosos/Erronka/talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET'})
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
                 celdaNombre.innerHTML = data[i].izena;
                 celdaNumeroAlumnos.innerHTML = data[i].langileak;
            }
        });
}

a();
