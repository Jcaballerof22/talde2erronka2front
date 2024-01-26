var upHorario = new Vue({
    el: '#upHorario',
    data: {
        lunes: "",
        lunes2: "",
        martes: "",
        miercoles: "",
        jueves: "",
        viernes: "",
        grupoHoy: "",
        limpieza: "",
        mostrador: "",
        borrarL: "",
        borrarM: "",
        datos: [],
        grupo: [],
        fecha: [{},{},{},{},{}],
        dias: [],
        datosRoles: [],
        titulua: 'HOME',
    },
    methods: {
        
        /////////////////////////////////////// EDITAR HORARIOS ////////////////////////////////////////////
        nombresGrupo(){
            // console.log('La instancia Vue se ha montado en el DOM.');
            fetch('../../talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                for (let i = 0; i < data.length; i++) {
                    this.datos.push({"izena" : data[i].izena, "kodea" : data[i].kodea});
                }
            });
        },
        grupoSeleccionado(){
            return fetch('../../talde2erronka2back/Erronka2/public/api/horarios', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                // console.log(data); 
                // console.log(data.length);
                for (let i = 0; i < data.length; i++) {
                    // console.log("DATA:");
                    // console.log(data[i].EZABATZE_DATA);
                    if(data[i].EZABATZE_DATA !== null){
                        // console.log("Ezabatze data NO es null");
                        this.grupo.push({"IZENA" : "", "HASIERA_DATA" : null, "AMAIERA_DATA" : null});
                        this.fecha.push({"HASIERA_DATA" : null, "AMAIERA_DATA" : null, "NUEVO" : true});
                        // this.dias[i]=("");
                        // console.log("Vacío: "+i+""+data[i].IZENA);
                    }else{
                        // console.log("Ezabatze data SI es null");
                        this.grupo.push({"IZENA" : data[i].IZENA, "HASIERA_DATA" : data[i].HASIERA_DATA, "AMAIERA_DATA" : data[i].AMAIERA_DATA});
                        // console.log("No vacio: "+i+""+data[i].IZENA);
                        this.fecha[data[i].EGUNA-1]=({"HASIERA_DATA" : data[i].HASIERA_DATA, "AMAIERA_DATA" : data[i].AMAIERA_DATA, "NUEVO" : false});
                        this.dias[data[i].EGUNA-1]=data[i].IZENA;
                    }
                    // console.log("DIAS: "+this.dias);
                    // console.log("Array fecha: "+this.fecha[i].HASIERA_DATA+this.fecha[i].NUEVO);
                }
                for (let i = 0; i < this.fecha.length; i++) {
                    // Verificar si la posición está vacía (objeto vacío)
                    if (Object.keys(this.fecha[i]).length === 0) {
                        // Asignar los nuevos datos
                        this.fecha[i] = {"HASIERA_DATA" : null, "AMAIERA_DATA" : null, "NUEVO" : true};
                    }
                }

                let hoy = new Date().getDay();
                this.grupoHoy = this.dias[(hoy-1)];
                console.log("HOOOY:::::"+(hoy-1));
                console.log("HOOOY:::::"+this.dias);
            });
        },
        updateDia(eguna, izena, fechaInicio, fechaFin) {
            console.log("froga2: ");
            var datos = {izena, eguna, fechaInicio, fechaFin};
                var js = JSON.stringify(datos); 
                console.log("froga: "+js);

            fetch('../../talde2erronka2back/Erronka2/public/api/horarios/editatu', {
                method: 'PUT',
                
                body: js
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                this.ocultarVentana();
            })
            .catch(error => {
                console.error('Error al actualizar los datos en el servidor:', error.message);
            });
        },
        aceptarCambios(){
            var filas = document.getElementById('tabla').getElementsByTagName('tr');
            // var datosActualizados = [];
            console.log("this.fecha", filas.length);
            for (var i = 1; i < filas.length; i++) { 
                console.log(this.fecha);
                // if (i==1){
                //     this.updateDia(i, "PEL1", null, null);
                // }
                if(this.fecha[i-1].NUEVO==true){
                    var celdas = filas[i].getElementsByTagName('td');
                    var dia = celdas[0].innerHTML;
                    var grupoSelect = celdas[1].getElementsByTagName('select')[0];
                    if (grupoSelect !== undefined) {
                        var grupoSeleccionado = grupoSelect.options[grupoSelect.selectedIndex]?.value;
                        console.log("Grupo seleccionado: "+grupoSeleccionado);
                        if (grupoSeleccionado !== undefined) {
                            console.log("Insert");
                            this.insertDia(i, this.dias[i-1], this.fecha[i-1].HASIERA_DATA, this.fecha[i-1].AMAIERA_DATA);
                        } else {
                            console.log("Es borrado");
                        }
                    }
                }
                else{  
                    var celdas = filas[i].getElementsByTagName('td');
                    var dia = celdas[0].innerHTML;
                    var grupoSelect = celdas[1].getElementsByTagName('select')[0];
                    if (grupoSelect !== undefined) {
                        var grupoSeleccionado = grupoSelect.options[grupoSelect.selectedIndex]?.value;
        
                        if (grupoSeleccionado !== undefined) {
                            console.log("Update");
                            this.updateDia(i, grupoSeleccionado, this.fecha[i - 1].HASIERA_DATA, this.fecha[i - 1].AMAIERA_DATA);
                        } else {
                            console.log("Es borrado");
                        }
                    }
                }
            }
    
            // console.log(datosActualizados);
        },
        insertDia(eguna, izena, fechaInicio, fechaFin) {
            console.log("froga2: ");
            var datos = {izena, eguna, fechaInicio, fechaFin};
                var js = JSON.stringify(datos); 
                console.log("froga: "+js);

            fetch('../../talde2erronka2back/Erronka2/public/api/horarios/txertatu', {
                method: 'POST',
                body: js
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                this.ocultarVentana();
            })
            .catch(error => {
                console.error('Error al actualizar los datos en el servidor:', error.message);
            });
        },
        eliminar(eguna){
            var js = JSON.stringify({"eguna": eguna});
            console.log("ezabatu: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/horarios/ezabatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });


            this.dias.splice(eguna - 1, 1, "");
            this.fecha[eguna-1].HASIERA_DATA=null;
            this.fecha[eguna-1].AMAIERA_DATA=null;
            this.fecha[eguna-1].NUEVO=true;
            console.log(this.dias);

        },
        ///////////////////////////////////////////////// ROLES ///////////////////////////////////////////////////
        tablaRoles(){
            let hoy = new Date();
            console.log(hoy);
            console.log(this.grupoHoy);
            fetch(`../../talde2erronka2back/Erronka2/public/api/roles/${this.grupoHoy}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log("LOS DATOS: ");
                console.log(data); 
                console.log(data.length);
                for (let i = 0; i < data.length; i++){
                    this.datosRoles.push({"izena" : data[i].izena, "abizenak" : data[i].abizenak, "id_langilea" : data[i].id_langilea, "suma_m" : data[i].suma_m, "suma_g" : data[i].suma_g});
                }
            });

            fetch(`../../talde2erronka2back/Erronka2/public/api/roles/pertsonak/${this.grupoHoy}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log("LOS DATOS: ");
                console.log(data); 
                console.log(data.length);
                for (let i = 0; i < data.length; i++){
                    if(data[i].data = hoy && data[i].ezabatze_data == null){
                        if(data[i].mota == "M"){
                            this.mostrador = data[i].id_langilea;
                            this.borrarM = data[i].id_langilea;
                        }else{
                            this.limpieza = data[i].id_langilea;
                            this.borrarL = data[i].id_langilea;
                        }
                    }
                }
            });

        },
        aceptarRoles(){
            // Solo si borrarL y limpieza / borrarM y mostrador son diferentes
            if(this.borrarL == this.limpieza){
                console.log("Limpieza igual");
            }else{
                this.deleteRoles(this.borrarL);
                this.insertRoles(this.limpieza, "G");
            }

            if(this.borrarM == this.mostrador){
                console.log("Limpieza igual");
            }else{
                this.deleteRoles(this.borrarM);
                this.insertRoles(this.mostrador, "M");
            }
            this.ocultarRoles();
        },
        deleteRoles(id_langilea){
            var js = JSON.stringify({"id_langilea": id_langilea});
            console.log("ezabatuRoles: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/roles/ezabatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });

        },
        insertRoles(id_langilea, mota){
            var datos = {id_langilea, mota};
            var js = JSON.stringify(datos); 
            console.log("inserRoles: "+js);

            fetch('../../talde2erronka2back/Erronka2/public/api/roles/txertatu', {
                method: 'POST',
                body: js
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                this.ocultarVentana();
            })
            .catch(error => {
                console.error('Error al actualizar los datos en el servidor:', error.message);
            });

        },
        /////////////////////////////////////// MOSTRAR-OCULTAR POPUPS ////////////////////////////////////////////
        ocultarVentana() {
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaHorarios').style.display = 'none';
        },
        mostrarVentana(){
            document.getElementById('tablaHorarios').style.display = 'block';
            document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
        },
        ocultarRoles() {
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaRoles').style.display = 'none';
        },
        mostrarRoles(){
            document.getElementById('tablaRoles').style.display = 'block';
            document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
        },

        tituluAldatu(){
            var scriptAnterior = document.getElementById("scriptDinamico");
            if (scriptAnterior) {
                scriptAnterior.remove();
            }
            // Crea un nuevo script y asigna su src según la opción seleccionada
            var nuevoScript = document.createElement("script");
            nuevoScript.id = "scriptDinamico";
            nuevoScript.onload = function() {
                console.log("Script cargado exitosamente");
            };
            nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});"; // Asigna el nombre del script según la opción
            // Agrega el nuevo script al cuerpo del documento
            document.body.appendChild(nuevoScript);
        }
        
    },
    watch:{},
    mounted: function() {
        this.nombresGrupo();
        this.grupoSeleccionado().then(() => {
            this.tablaRoles();
            this.tituluAldatu();
        });
        
      }
});