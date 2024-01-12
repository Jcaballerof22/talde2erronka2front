async function a() {
    fetch('../../talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET'})
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
// 

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

function insertar(){
    kodea = document.getElementById('codigoTextoGrupos').value;
    izena = document.getElementById('nombreTextoGrupos').value;
    if(kodea=="" || izena==""){
        alert("Datu falta dira")
    }else{
        var datos = {kodea, izena};
        var js = JSON.stringify(datos); 
        console.log("froga: "+js);

        fetch('../../talde2erronka2back/Erronka2/public/api/grupos/txertatu', {method: 'POST', body: js})
        .then(function (response) {
                return response.text();
        })
        .then(data=>{
            console.log(data);
            // if(data.match("No hay stock suficiente")){
            //     if(confirm("No puedes insertar más stock. Deseas añadir?")){
            //         gehituStock();
            //     }else{

            //     }
            //     alert(etiketa + " txertatuta");
            // }
            //AQUÍ UN WINDOW PROMPT DEL STOCK DISPONIBLE DE ESE EKIPAMENDU
        })
        .catch(error => {
            console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        });
    }
}