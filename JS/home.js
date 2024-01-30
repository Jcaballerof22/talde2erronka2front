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
        async nombresGrupo() {
            try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.datos.push({ "izena": data[i].izena, "kodea": data[i].kodea });
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        async grupoSeleccionado() {
            try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/horarios', { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                if (data[i].EZABATZE_DATA !== null) {
                  this.grupo.push({ "IZENA": "", "HASIERA_DATA": null, "AMAIERA_DATA": null });
                  this.fecha.push({ "HASIERA_DATA": null, "AMAIERA_DATA": null, "NUEVO": true });
                } else {
                  this.grupo.push({ "IZENA": data[i].IZENA, "HASIERA_DATA": data[i].HASIERA_DATA, "AMAIERA_DATA": data[i].AMAIERA_DATA });
                  this.fecha[data[i].EGUNA - 1] = ({ "HASIERA_DATA": data[i].HASIERA_DATA, "AMAIERA_DATA": data[i].AMAIERA_DATA, "NUEVO": false });
                  this.dias[data[i].EGUNA - 1] = data[i].IZENA;
                }
              }
          
              for (let i = 0; i < this.fecha.length; i++) {
                if (Object.keys(this.fecha[i]).length === 0) {
                  this.fecha[i] = { "HASIERA_DATA": null, "AMAIERA_DATA": null, "NUEVO": true };
                }
              }
          
              let hoy = new Date().getDay();
              this.grupoHoy = this.dias[(hoy - 1)];
              console.log("HOOOY:::::" + (hoy - 1));
              console.log("HOOOY:::::" + this.dias);
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        async updateDia(eguna, izena, fechaInicio, fechaFin) {
            try {
              console.log("froga2: ");
              var datos = { izena, eguna, fechaInicio, fechaFin };
              var js = JSON.stringify(datos);
              console.log("froga: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/horarios/editatu', {
                method: 'PUT',
                body: js
              });
          
              if (!response.ok) {
                throw new Error('Error en la solicitud');
              }
          
              const data = await response.json();
              console.log('Respuesta del servidor:', data);
              this.ocultarVentana();
            } catch (error) {
              console.error('Error al actualizar los datos en el servidor:', error.message);
            }
        },
        async aceptarCambios() {
            try {
              var filas = document.getElementById('tabla').getElementsByTagName('tr');
              console.log("this.fecha", filas.length);
              for (var i = 1; i < filas.length; i++) {
                console.log(this.fecha);
                if (this.fecha[i - 1].NUEVO == true) {
                  var celdas = filas[i].getElementsByTagName('td');
                  var dia = celdas[0].innerHTML;
                  var grupoSelect = celdas[1].getElementsByTagName('select')[0];
                  if (grupoSelect !== undefined) {
                    var grupoSeleccionado = grupoSelect.options[grupoSelect.selectedIndex]?.value;
                    console.log("Grupo seleccionado: " + grupoSeleccionado);
                    if (grupoSeleccionado !== undefined) {
                      console.log("Insert");
                      await this.insertDia(i, this.dias[i - 1], this.fecha[i - 1].HASIERA_DATA, this.fecha[i - 1].AMAIERA_DATA);
                    } else {
                      console.log("Es borrado");
                    }
                  }
                } else {
                  var celdas = filas[i].getElementsByTagName('td');
                  var dia = celdas[0].innerHTML;
                  var grupoSelect = celdas[1].getElementsByTagName('select')[0];
                  if (grupoSelect !== undefined) {
                    var grupoSeleccionado = grupoSelect.options[grupoSelect.selectedIndex]?.value;
          
                    if (grupoSeleccionado !== undefined) {
                      console.log("Update");
                      await this.updateDia(i, grupoSeleccionado, this.fecha[i - 1].HASIERA_DATA, this.fecha[i - 1].AMAIERA_DATA);
                    } else {
                      console.log("Es borrado");
                    }
                  }
                }
              }
            } catch (error) {
              console.error('Error al aceptar los cambios:', error);
            }
        },
        async insertDia(eguna, izena, fechaInicio, fechaFin) {
            try {
              console.log("froga2: ");
              var datos = { izena, eguna, fechaInicio, fechaFin };
              var js = JSON.stringify(datos);
              console.log("froga: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/horarios/txertatu', {
                method: 'POST',
                body: js
              });
          
              if (!response.ok) {
                throw new Error('Error en la solicitud');
              }
          
              const data = await response.json();
              console.log('Respuesta del servidor:', data);
              this.ocultarVentana();
            } catch (error) {
              console.error('Error al insertar los datos en el servidor:', error.message);
            }
        },
        async eliminar(eguna) {
            try {
              var js = JSON.stringify({ "eguna": eguna });
              console.log("ezabatu: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/horarios/ezabatu', { method: 'PUT', body: js });
          
              if (!response.ok) {
                throw new Error('Error en la solicitud');
              }
          
              const data = await response.text();
              console.log(data);
          
              this.dias.splice(eguna - 1, 1, "");
              this.fecha[eguna - 1].HASIERA_DATA = null;
              this.fecha[eguna - 1].AMAIERA_DATA = null;
              this.fecha[eguna - 1].NUEVO = true;
              console.log(this.dias);
            } catch (error) {
              console.error("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu", error);
            }
          }
          ,
        ///////////////////////////////////////////////// ROLES ///////////////////////////////////////////////////
        async tablaRoles() {
            try {
              var today = new Date();
              var year = today.getFullYear();
              var month = (today.getMonth() + 1).toString().padStart(2, '0');
              var day = today.getDate().toString().padStart(2, '0'); 
              var formattedDate = year + '-' + month + '-' + day;
              var hoy = formattedDate;
          
              console.log("Today is: " + hoy);
              console.log(this.grupoHoy);
          
              const response1 = await fetch(`../../talde2erronka2back/Erronka2/public/api/roles/${this.grupoHoy}`, { method: 'GET' });
              if (!response1.ok) {
                throw new Error('Error en la solicitud');
              }
              const data1 = await response1.json();
              console.log("LOS DATOS: ");
              console.log(data1); 
              console.log(data1.length);
              for (let i = 0; i < data1.length; i++) {
                this.datosRoles.push({ "izena": data1[i].izena, "abizenak": data1[i].abizenak, "id_langilea": data1[i].id_langilea, "suma_m": data1[i].suma_m, "suma_g": data1[i].suma_g });
              }
          
              const response2 = await fetch(`../../talde2erronka2back/Erronka2/public/api/roles/pertsonak/${this.grupoHoy}`, { method: 'GET' });
              if (!response2.ok) {
                throw new Error('Error en la solicitud');
              }
              const data2 = await response2.json();
              for (let i = 0; i < data2.length; i++) {
                if (data2[i].data == hoy && data2[i].ezabatze_data == null) {
                  if (data2[i].mota === 'M') {
                    this.mostrador = data2[i].id_langilea;
                    this.borrarM = data2[i].id_langilea;
                  } else {
                    this.limpieza = data2[i].id_langilea;
                    this.borrarL = data2[i].id_langilea;
                  }
                }
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
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
        async deleteRoles(id_langilea) {
            try {
              var js = JSON.stringify({ "id_langilea": id_langilea });
              console.log("ezabatuRoles: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/roles/ezabatu', {
                method: 'PUT',
                body: js
              });
          
              if (!response.ok) {
                throw new Error('Error en la solicitud');
              }
          
              const data = await response.text();
              console.log(data);
            } catch (error) {
              console.error('Error al eliminar los roles:', error);
            }
        },
        async insertRoles(id_langilea, mota) {
            try {
              var datos = { id_langilea, mota };
              var js = JSON.stringify(datos); 
              console.log("inserRoles: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/roles/txertatu', {
                method: 'POST',
                body: js
              });
          
              if (!response.ok) {
                throw new Error('Error en la solicitud');
              }
          
              const data = await response.json();
              console.log('Respuesta del servidor:', data);
              this.ocultarVentana();
            } catch (error) {
              console.error('Error al actualizar los datos en el servidor:', error.message);
            }
          }
          ,
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