document.addEventListener('DOMContentLoaded', function() {
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

});

var upHorario = new Vue({
    el: '#upHorario',
    data: {
        lunes: "",
        martes: "",
        miercoles: "",
        jueves: "",
        viernes: "",
        datos: [],
    },
    methods: {
        nombresGrupo(){
            console.log('La instancia Vue se ha montado en el DOM.');
            // Puedes realizar operaciones adicionales aquí
            fetch('../../talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                for (let i = 0; i < data.length; i++) {
                    // Obtén la referencia de la tabla por su id
                    this.datos.push({"izena" : data[i].izena, "kodea" : data[i].kodea});
                }
            });
        },
        cambiar(){
            console.log(this.lunes)            
        }
    },
    watch:{},
    mounted: function() {
        this.nombresGrupo();
        // //
        //         fetch('../../talde2erronka2back/Erronka2/public/api/horarios', { method: 'GET' })
        //             .then(response => response.json())
        //             .then(data => {
        //                 console.log(data);

        //                 var opcionesUnicas = new Set();

        //                 for (let j = 0; j < data.length; j++) {
        //                     opcionesUnicas.add(data[j].IZENA); 
        //                 }

        //                 for (let i = 0; i < data.length; i++) {
        //                     var tabla = document.getElementById("tabla");

        //                     var fila = tabla.insertRow();

        //                     var celdaDia = fila.insertCell(0);
        //                     var celdaGrupo = fila.insertCell(1);

        //                     switch (data[i].EGUNA) {
        //                         case 1:
        //                             celdaDia.innerHTML = 'Lunes';
        //                             break;
        //                         case 2:
        //                             celdaDia.innerHTML = 'Martes';
        //                             break;
        //                         case 3:
        //                             celdaDia.innerHTML = 'Miércoles';
        //                             break;
        //                         case 4:
        //                             celdaDia.innerHTML = 'Jueves';
        //                             break;
        //                         case 5:
        //                             celdaDia.innerHTML = 'Viernes';
        //                             break;
        //                         default:
        //                             break;
        //                     }

        //                     var select = document.createElement("select");
        //                     select.className = "form-select";
        //                     select.setAttribute("aria-label", "Default select example");
        //                     select.id = "grupoSelect_" + i;

        //                     var optionDefault = document.createElement("option");
        //                     optionDefault.value = "";
        //                     optionDefault.text = data[i].IZENA;
        //                     optionDefault.selected = true;
        //                     optionDefault.disabled = true;
        //                     optionDefault.style.display = "none"; 
        //                     select.appendChild(optionDefault);

        //                     opcionesUnicas.forEach(opcion => {
        //                         var option = document.createElement("option");
        //                         option.value = opcion;
        //                         option.text = opcion;
        //                         select.appendChild(option);
        //                     });

        //                     celdaGrupo.appendChild(select);
        //                 }
        //             })
        //     }
        //
      }
});


//Meter los datos a la tabla horarios

// async function horario() {
//     fetch('../../talde2erronka2back/Erronka2/public/api/horarios', { method: 'GET' })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);

//             var opcionesUnicas = new Set();

//             for (let j = 0; j < data.length; j++) {
//                 opcionesUnicas.add(data[j].IZENA); 
//             }

//             for (let i = 0; i < data.length; i++) {
//                 var tabla = document.getElementById("tabla");

//                 var fila = tabla.insertRow();

//                 var celdaDia = fila.insertCell(0);
//                 var celdaGrupo = fila.insertCell(1);

//                 switch (data[i].EGUNA) {
//                     case 1:
//                         celdaDia.innerHTML = 'Lunes';
//                         break;
//                     case 2:
//                         celdaDia.innerHTML = 'Martes';
//                         break;
//                     case 3:
//                         celdaDia.innerHTML = 'Miércoles';
//                         break;
//                     case 4:
//                         celdaDia.innerHTML = 'Jueves';
//                         break;
//                     case 5:
//                         celdaDia.innerHTML = 'Viernes';
//                         break;
//                     default:
//                         break;
//                 }

//                 var select = document.createElement("select");
//                 select.className = "form-select";
//                 select.setAttribute("aria-label", "Default select example");
//                 select.id = "grupoSelect_" + i;

//                 var optionDefault = document.createElement("option");
//                 optionDefault.value = "";
//                 optionDefault.text = data[i].IZENA;
//                 optionDefault.selected = true;
//                 optionDefault.disabled = true;
//                 optionDefault.style.display = "none"; 
//                 select.appendChild(optionDefault);

//                 opcionesUnicas.forEach(opcion => {
//                     var option = document.createElement("option");
//                     option.value = opcion;
//                     option.text = opcion;
//                     select.appendChild(option);
//                 });

//                 celdaGrupo.appendChild(select);
//             }
//         })
// }

//horario();

                        // document.getElementById('aceptarHorarios').addEventListener('click', function() {
                        //     var filas = document.getElementById('tabla').getElementsByTagName('tr');
                        //     var datosActualizados = [];

                        //     for (var i = 1; i < filas.length; i++) { 
                        //         var celdas = filas[i].getElementsByTagName('td');
                        //         var dia = celdas[0].innerHTML;
                        //         var grupoSelect = celdas[1].getElementsByTagName('select')[0];
                        //         var grupoSeleccionado = grupoSelect.options[grupoSelect.selectedIndex].value;
                                
                        //         if (grupoSeleccionado != "") {
                        //             updateDia(i, grupoSeleccionado)
                        //         }
                        //     }

                        //     console.log(datosActualizados);
                            
                        // });

                        // function updateDia(eguna, izena) {
                        //     var datos = {izena, eguna};
                        //         var js = JSON.stringify(datos); 
                        //         console.log("froga: "+js);

                        //     fetch('../../talde2erronka2back/Erronka2/public/api/horarios/editatu', {
                        //         method: 'PUT',
                                
                        //         body: js,
                        //     })
                        //     .then(response => {
                        //         if (!response.ok) {
                        //             throw new Error('Error en la solicitud');
                        //         }
                        //         return response.json();
                        //     })
                        //     .then(data => {
                        //         console.log('Respuesta del servidor:', data.message);
                        //         ocultarVentana();
                        //     })
                        //     .catch(error => {
                        //         console.error('Error al actualizar los datos en el servidor:', error.message);
                        //     });
                        // }




