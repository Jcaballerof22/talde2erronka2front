var home = new Vue({
    el: '#home',
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
        ////////////////////////////////////////////////////////////// P2 CITA //////////////////////////////////////////////////////////////
        // Bilatzailea erabiltzeko
        bilatu: '',
        bilatusinbol: '',
        data : '',
        // gure datuak
        datos2: [],
        taula: [],
        alumnos: [],
        hoy:'',
        langileDisp: 0,
        // Popup-aren Datuak
        idCita: '',
        izena : '',
        telefonoa : '',
        deskribapena : '',
        hasiera_ordua : '',
        amaiera_ordua : '',
        grupoCita: '',
        alumnoCita: '',
        alumnoCitaid: '0',
        dataCita: '',
        extra:0,
        etxekoa : false,
        // Horduak
        intervaloHoras:[9,15,16,20], //0-1 para la mañana, 2-3 para la tarde
        orduakG: [],
        orduakA: [],
        orduak: [],
        // Tratamenduak
        tratamendu: "",
        tratamenduak: [],
        tratamenduakCita: [],
        tratamenduakCitaText: "",
        totalPrezioa: 0,
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
            var nuevoScript = document.createElement("script");
            nuevoScript.id = "scriptDinamico";
            nuevoScript.onload = function() {
                console.log("Script cargado exitosamente");
            };
            nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});"; // Asigna el nombre del script según la opción
            document.body.appendChild(nuevoScript);
        },

        ////////////////////////////////////////////////////////////// P2 CITA //////////////////////////////////////////////////////////////
        // ordenatzerakoan minutuak kontuan hartzeko
        minCalc(minutua){
          counter=0;
          switch(minutua){
              case '15':
                  counter=+1;
              break;
              case '30':
                  counter=+2;
                  break;
              case '45':
                  counter=+3;
                  break;
              default:

                  break;
          }
          return counter;
      },

      ordenan(){
          timeDiff=0;
          for(let i = 0; i < this.datos2.length; i++) {
              orduH = this.datos2[i].hasiera_ordua.split(":");
              orduA = this.datos2[i].amaiera_ordua.split(":");
              orduDif = (parseInt(orduA[0]) - parseInt(orduH[0]))*4;
              minDif = this.minCalc(orduA[1]) - this.minCalc(orduH[1]);
              timeDif = minDif + orduDif;
              var js = {"izena": this.datos2[i].izena, "deskribapena" : this.datos2[i].deskribapena, "orduak" : this.datos2[i].hasiera_ordua+"-"+this.datos2[i].amaiera_ordua, "timeDif": timeDif, "visible" : true, "disponible": false, "id" : this.datos2[i].id};
              
              //Lekua bilatu
              var sitio = null;
              for (let j = 0; j < this.langileDisp; j++) {
                  for (let k = 0; k < this.taula.length; k++) {
                      if ((orduH[0]+":"+orduH[1])==this.orduak[k] && this.taula[k][j].disponible) {
                          horas2:for (let i = 0; i < js.timeDif; i++) {
                              if (this.taula[k+i][j].disponible) {
                                  sitio = j;
                              }else {
                                  sitio = null;
                                  break horas2;
                              }
                          }
                      }
                  }
              }

              //Lekuan Kokatu
              for (let i = 0; i < this.taula.length; i++) {
                  if ((orduH[0]+":"+orduH[1])==this.orduak[i]) {
                      for (let l = 0; l < js.timeDif; l++) {
                          if (l==0) {
                              this.taula[i+l][sitio] = js;
                          }else{
                              this.taula[i+l][sitio] = {"visible": false, "disponible": false};
                          }
                      }
                  }
              }
          }
          this.taula = this.taula.map(subarray => subarray.slice().reverse());

      },

      // popup-a zabaltzeko eta datuak esleitzeko
      popupCita(id){
          this.idCita = id;
          this.dataCita = this.data;
          if (id != '') {
            this.citaTratamenduaLortu();
            for (let i = 0; i < this.datos2.length; i++) {
              if (this.datos2[i].id==id) {
                  this.izena = this.datos2[i].izena;
                  this.telefonoa = this.datos2[i].telefonoa;
                  this.deskribapena = this.datos2[i].deskribapena;
                  this.hasiera_ordua = this.datos2[i].hasiera_ordua;
                  this.amaiera_ordua = this.datos2[i].amaiera_ordua;
                  this.grupoCita = this.datos2[i].izena_taldea;
                  this.alumnoCita = this.datos2[i].izena_langilea;
                  this.alumnoCitaid = this.datos2[i].id_langilea
                  if (this.datos2[i].etxekoa == 'E') {
                      this.etxekoa = true;  
                  }else{
                      this.etxekoa = false; 
                  }
              }
              
            }
          }else{
            this.etxekoa = false; 
            this.izena = ''
            this.telefonoa = ''
            this.deskribapena = ''
            this.hasiera_ordua = ''
            this.amaiera_ordua = ''
            this.tratamenduakCitaText = ''
            this.alumnoCitaid = '13'
            this.alumnoCita = '';
            this.grupoCita = ''
          }
          document.getElementById('fondoOscuro2').classList.add('mostrar-fondo');
          document.getElementById('ventanaEmergenteLangile').style.display = 'block';
      },

      // taulako estruktura sortu
      taulaSortu(){
          for (let i = 0; i < this.orduak.length; i++) {
              var row =[];
              for (let j = 0; j < this.langileDisp; j++) {
                  row.push({"visible": true, "disponible": true});
              }
              this.taula.push(row) ;   
          }
      },

      // Hitzorduak lortu // this.data -> nahi ditugun hitzorduen data // this.bilatusinbol -> if('+'){sartutako data eta berriagoak}else{bakarrik gure datakoak}
      datuakLortu(){
          this.datos2 = [];
          this.taula = [];
          fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/' + this.data + this.bilatusinbol, { method: 'GET', mode: 'no-cors'})
          .then(response => response.json())
          .then(data => {
              console.log(data);
              for (let i = 0; i < data.length; i++) {
                  console.log(data[i]);
                  this.datos2.push(data[i]);
              }
              if (this.bilatusinbol != '+'){
                  this.taulaSortu();
                  this.ordenan(); 
              }else{
                  this.taula = [];
                  for (let i = 0; i < this.datos2.length; i++){
                      if(this.datos2[i].izena.startsWith(this.bilatu)){
                          this.taula.push({"id" : this.datos2[i].id, "data" : this.datos2[i].data, "hasiera_ordua" : this.datos2[i].hasiera_ordua, "amaiera_ordua" : this.datos2[i].amaiera_ordua, "izena" : this.datos2[i].izena, "telefonoa" : this.datos2[i].telefonoa, "deskribapena" : this.datos2[i].deskribapena, "etxekoa" : this.datos2[i].etxekoa});
                      }
                  }
              }
          }); 
      },

      // Gaurko data lortzeko
      lortuData(){
          var gaur = new Date();
          var urtea = gaur.getFullYear();
          var hilabetea = gaur.getMonth() + 1;
          var eguna = gaur.getDate();
          var ordua = gaur.getHours();
          if (eguna < 10) {
              eguna = '0'+eguna
          }
          if (hilabetea < 10) {
              hilabetea = '0'+hilabetea
          }
          if (ordua < this.intervaloHoras[1]) {
              this.orduak = this.orduakG;
          } else {
              this.orduak = this.orduakA;
          }
          return urtea+'-'+hilabetea+'-'+eguna;
      },

      // Goizeko orduak eskuratzeko
      lortuOrduakG(){
          orduakaux = [this.intervaloHoras[0],this.intervaloHoras[1]]
          orduDif = (orduakaux[1] - orduakaux[0])+1;
          for (let i = 0; i < orduDif; i++) {
              aux = orduakaux[0]+i
              for (let j = 0; j < 4; j++) {
                  switch(j){
                      case 1:
                          mins = '15';
                          break;
                      case 2:
                          mins = '30';
                          break;
                      case 3:
                          mins = '45';
                          break;
                      default:
                          mins = '00';
                          break;
                  }
                  if (aux < 10) {
                      h = '0' + aux;
                  }else {
                      h = aux;
                  }
                  this.orduakG.push(h + ':' + mins);
              }
              
          }
      },

      // Arratsaldeko orduak eskuratzeko
      lortuOrduakA(){
          orduakaux =  [this.intervaloHoras[2],this.intervaloHoras[3]]
          orduDif = (orduakaux[1] - orduakaux[0])+1;
          for (let i = 0; i < orduDif; i++) {
              aux = orduakaux[0]+i
              for (let j = 0; j < 4; j++) {
                  switch(j){
                      case 1:
                          mins = '15';
                          break;
                      case 2:
                          mins = '30';
                          break;
                      case 3:
                          mins = '45';
                          break;
                      default:
                          mins = '00';
                          break;
                  }
                  if (aux < 10) {
                      h = '0' + aux;
                  }else {
                      h = aux;
                  }
                  this.orduakA.push(h + ':' + mins);
              }
              
          }
      },

      // Tratamendu lista lortu
      async tratamenduakLortu() {
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak', {
                  method: 'GET',
                  mode: 'no-cors'
              });
              
              const data = await response.json();
              
              console.log(data);
              
              data.forEach(tratamiento => {
                  console.log(tratamiento);
                  this.tratamenduak.push(tratamiento);
              });
          } catch (error) {
              console.error('Error al obtener los tratamientos:', error);
          }
      },

      // Hitzordu bat dituen tratamendu guztiak lortu
      async citaTratamenduaLortu(){
          this.tratamenduakCitaText = "";
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak/'+this.idCita, {
                  method: 'GET',
                  mode: 'no-cors'
              });
              
              const data = await response.json();
              
              console.log(data);
              
              this.tratamenduakCita = data;
              
              for (let i = 0; i < data.length; i++) {
                  this.tratamenduakCitaText += data[i].tratamenduIzena + " " + data[i].prezioa + " -- ";
              }

          } catch (error) {
              console.error('Error al obtener los tratamientos:', error);
          }
      },

      // Hitzordak duten tratameduak gehitzeko
      async tratamenduaGehitu(){
          var prezioa = 0;
          if (this.extra == 0) {
              for (let i = 0; i < this.tratamenduak.length; i++) {
                  if (this.tratamenduak[i].id == this.tratamendu) {
                      if(this.etxekoa){
                          prezioa = this.tratamenduak[i].etxeko_prezioa;
                      }else{
                          prezioa = this.tratamenduak[i].kanpoko_prezioa;
                      } 
                  }
              }
          }else{
              prezioa = this.extra;
          }
          var datos = {"id_hitzordua" : this.idCita, "id_tratamendua" : this.tratamendu, "prezioa" : prezioa};
          var js = JSON.stringify(datos); 
          console.log("insert: "+js);

          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak/add', {
                  method: 'POST',
                  mode: 'no-cors',
                  body: js
              });
              
              const data = await response.json();
              
              console.log(data);
              this.citaTratamenduaLortu();
          } catch (error) {
              console.error('Error al obtener los tratamientos:', error);
          }
      },

      // Hitzordak duten tratameduak kentzeko
      async tratamenduaKendu(){
          var datos = "";
          for (let i = 0; i < this.tratamenduakCita.length; i++) {
              if (this.tratamenduakCita[i].id_tratamendua == this.tratamendu) {
                  datos = {"id":this.tratamenduakCita[i].id};
                  break;
              }
          }
          
          var js = JSON.stringify(datos); 
          console.log("del: "+js);
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak/remove', {
                  method: 'PUT',
                  body: js
              });
              const data = await response.json();
              console.log(data);
              this.citaTratamenduaLortu();
          } catch (error) {
              console.error('Error al obtener los tratamientos:', error);
          }
      },

      // Hitzortua ezabatzeko
      async hitzorduaKendu(){
          const js = JSON.stringify({"id": this.idCita}); 
          console.log("froga: " + js);
          
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/ezabatu', {
                  method: 'PUT',
                  body: js
              });

              const data = await response.text();
              console.log(data);

              this.taula = this.taula.filter(aux => aux.id !== this.idCita);
              this.datuakLortu()
          } catch (error) {
              console.error("Error al eliminar el registro:", error);
              console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
          }
          this.quitarFondoNegro();
      },

      // Pop-a ren fondo beltza kentzeko
      quitarFondoNegro(){
          document.getElementById('fondoOscuro2').classList.remove('mostrar-fondo');
          document.getElementById('ventanaEmergenteLangile').style.display = 'none';
          document.getElementById('ventanaEmergenteTiket').style.display = 'none';
      },

      // Langile kopurua lortzeko
      async langileKopLortu(){
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/'+this.data, {
                  method: 'GET',
                  mode: 'no-cors'
              });
              const data = await response.json();
              console.log(data);
              this.alumnos = data;      
              this.langileDisp = data.length ;
          } catch (error) {
              console.error('Error al obtener los tratamientos:', error);
          }
      },
      ///////////////////////////////////////  ///////////////////////////////////////
      createCita(){
        datos = '/' + this.dataCita + '/' + this.hasiera_ordua + '/' + this.amaiera_ordua; 
        console.log("losdatos: "+datos);
        try {
          fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/horduDisp'+datos)
          .then(response => response.json())
          .then(data => {
            if (data.length < this.langileDisp){
              // Fetch 2
              const js = JSON.stringify({"izena": this.izena, "telefonoa": this.telefonoa, "deskribapena": this.deskribapena, "hasiera_ordua": this.hasiera_ordua, "amaiera_ordua": this.amaiera_ordua, "langilea": this.alumnoCitaid, "etxekoa": this.etxekoa, "data": this.dataCita}); 
              console.log("insert: "+js);
              fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/txertatu', {
                method: 'POST',
                body: js
              })
              .then(response => response.json())
              .then(data => {
                this.datuakLortu()
              });
            }
            else alert("Se superó el limite de citas para las horas seleccionadas");
          });
        } catch (error) {
          console.log(error);
        }
        
        this.quitarFondoNegro()
      },

      async aldatuOrduaAmaiera(){
          const js = JSON.stringify({"id": this.idCita, "ordua": this.amaiera_ordua}); 
          console.log("froga: " + js);
          try {
            const response = await fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/horduaAmaiera', {
              method: 'PUT',
              body: js
            });
            const data = await response.text();
            console.log(data);
            this.taula = this.taula.filter(aux => aux.id !== id);
            } catch (error) {
              console.error("Error al eliminar el registro:", error);
              console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
          }
      },

      async aldatuOrduaHasiera(){
        const js = JSON.stringify({"id": this.idCita, "ordua": this.hasiera_ordua}); 
        console.log("froga: " + js);
        
        try {
            const response = await fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/horduaHasiera', {
                method: 'PUT',
                body: js
            });

            const data = await response.text();
            console.log(data);

            this.taula = this.taula.filter(aux => aux.id !== id);
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
        }
      },

      popupTicket(){
        document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        document.getElementById('fondoOscuro2').classList.add('mostrar-fondo');
        document.getElementById('ventanaEmergenteTiket').style.display = 'block';
      },

      // fichaSortu(){
      //   sensible = confirm('Tiene el cuero cabelludo sensible¿')
      //   alert('ficha sortuta '+ sensible);
      //   izenabizen = this.izena.split(' ');
      //   abizena = '';
      //   for (let i = 1; i < izenabizen.length; i++) {
      //     abizena = izenabizen[i] + ' ';
          
      //   }
      //   js = JSON.stringify({'izena': izenabizen[0],	'abizena': abizena,	'telefonoa': this.telefonoa,	'azal_sentikorra': sensible})
      //   console.log('Ficha'+js)
      // },
        
    },
    watch:{
      data:function(){
        this.dataCita = this.data;
        this.datuakLortu();
        this.langileKopLortu();
      },

      bilatu:function(){
          if (this.bilatu == '') {
              this.bilatusinbol = '';
              this.datuakLortu();
          }else{
              this.bilatusinbol = '+';
              this.datuakLortu();
          }
          
      },

      tratamendu: function(){
          this.extra = 0;
      },

      hasiera_ordua: function(){
        this.aldatuOrduaHasiera();
      },

      amaiera_ordua: function(){
        this.aldatuOrduaAmaiera();
      },

      tratamenduakCita: function(){
        this.totalPrezioa = 0;
        this.tratamenduakCita.forEach(element => {
          this.totalPrezioa = + this.totalPrezioa + +element.prezioa;
        });
      },

    },
    mounted: function() {
        this.nombresGrupo();
        this.grupoSeleccionado().then(() => {
            this.tablaRoles();
            this.tituluAldatu();
        });
        this.lortuOrduakG();
        this.lortuOrduakA();
        this.tratamenduakLortu();
        this.data = this.lortuData();
        this.hoy =  this.data;
         
      }
});