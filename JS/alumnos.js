// async function b() {
//     fetch('../../talde2erronka2back/Erronka2/public/api/alumnos', { method: 'GET'})
//         .then(response => response.json())
//         .then(data => {
//             console.log(data); 
//             for (let i = 0; i < data.length; i++) {
//                 // Obtén la referencia de la tabla por su id
//                 var tabla = document.getElementById("tabla");

//                 // Agrega una fila a la tabla
//                 var fila = tabla.insertRow();
    
//                 // Agrega celdas a la fila
//                 var celdaNombre = fila.insertCell(0);
//                 var celdaNumeroAlumnos = fila.insertCell(1);
    
//                 // Agrega contenido a las celdas
//                 celdaNombre.innerHTML = data[i].izena + " " + data[i].abizenak;
//                 celdaNumeroAlumnos.innerHTML = data[i].taldea;
//             }
//         });
// }

// b();

var app = new Vue({
    el: '#app',
    data: {
        izena: "",
        kodea: "",
        datos: [],
        abizenak: "",
    },
    methods: {
        addDatos(){
            //
                if(this.kodea=="" || this.izena==""){
                    alert("Datu falta dira")
                }else{
                    var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena, "abizenak": this.abizenak }); 
                    console.log("froga: "+js);
                    fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/txertatu', {method: 'POST', body: js, mode: 'no-cors'})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.datos.push({"langilea_izena" : this.izena, "langilea_abizenak" : this.abizenak, "taldea_izena" : this.taldea});
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
            //
                }
        }
    },
    watch:{},
    mounted: function() {
        // Código que se ejecuta cuando la instancia Vue se ha montado en el DOM
        console.log('La instancia Vue se ha montado en el DOM.');
        // Puedes realizar operaciones adicionales aquí
        fetch('../../talde2erronka2back/Erronka2/public/api/alumnos', { method: 'GET', mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            for (let i = 0; i < data.length; i++) {
                console.log(data);
                // Obtén la referencia de la tabla por su id
                this.datos.push({"langilea_izena" : data[i].langilea_izena, "langilea_abizenak" : data[i].langilea_abizenak, "taldea_izena" : data[i].taldea_izena});
            }
        });
      }
});

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