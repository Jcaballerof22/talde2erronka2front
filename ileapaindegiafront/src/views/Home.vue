<script>
import testua from "../assets/json/Home.json";

export default {
    data() {
        return {
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
            fecha: [{}, {}, {}, {}, {}],
            dias: [],
            datosRoles: [],
            ////////////////////////////////////////////////////////////// P2 CITA //////////////////////////////////////////////////////////////
            // Bilatzailea erabiltzeko
            bilatu: '',
            bilatusinbol: '',
            data: '',
            // gure datuak
            datos2: [],
            taula: [],
            alumnos: [],
            hoy: '',
            langileDisp: 5,
            // Popup-aren Datuak
            idCita: '',
            izena: '',
            telefonoa: '',
            deskribapena: '',
            hasiera_ordua: '',
            amaiera_ordua: '',
            grupoCita: '',
            alumnoCita: '',
            alumnoCitaid: '0',
            dataCita: '',
            extra: 0,
            etxekoa: false,
            // Horduak
            intervaloHoras: [9, 15, 16, 20], //0-1 para la mañana, 2-3 para la tarde
            orduakG: [],
            orduakA: [],
            orduak: [],
            // Tratamenduak
            tratamendu: "",
            tratamenduak: [],
            tratamenduakCita: [],
            tratamenduakCitaText: "",
            totalPrezioa: 0,
            ////////////////////////////////////////////////////////////// Hizkuntza //////////////////////////////////////////////////////////////
            hizkuntza: 'ESP',
            testua: testua,
        }
    },
    methods: {

        async langileaLortu(id,rol){
            try{
                const response = await fetch(window.ruta + 'langileLortu/' + id, { method: 'GET' });
                const datos = await response.json();
                console.log(datos[0].izena)
                this.crarCookie(rol, datos[0].izena+' '+datos[0].abizenak)
            }catch (error) {
                console.error('Error al obtener datos del servidor:', error);
            }
            
        },


        /////////////////////////////////////// EDITAR HORARIOS ////////////////////////////////////////////
        async nombresGrupo() {
            try {
                const response = await fetch(window.ruta + 'grupos', { method: 'GET' });

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
                const response = await fetch(window.ruta + 'horarios', { method: 'GET' });

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

                const response = await fetch(window.ruta + 'horarios/editatu', {
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

                const response = await fetch(window.ruta + 'horarios/txertatu', {
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

                const response = await fetch(window.ruta + 'horarios/ezabatu', { method: 'PUT', body: js });

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
        crarCookie(nombre,valor){
            if(valor == '' || valor == undefined){

            }else{
                var finCookie = new Date();
                finCookie.setDate(finCookie.getDate() + 1); // Suma un día a la fecha actual
                finCookie.setHours(12, 0, 0, 0); // Establece la hora en 12:00:00

                var finC = "expires=" + finCookie.toUTCString();
                document.cookie = nombre + "=" + valor + ";" + finC + ";path=/";
            }
        },

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

                const response1 = await fetch(window.ruta + `roles/${this.grupoHoy}`, { method: 'GET' });
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

                const response2 = await fetch(window.ruta + `roles/pertsonak/${this.grupoHoy}`, { method: 'GET' });
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
        aceptarRoles() {
            // Solo si borrarL y limpieza / borrarM y mostrador son diferentes
            if (this.borrarL == this.limpieza) {
                console.log("Limpieza igual");
            } else {
                this.deleteRoles(this.borrarL);
                this.insertRoles(this.limpieza, "G");
            }

            if (this.borrarM == this.mostrador) {
                console.log("Limpieza igual");
            } else {
                this.deleteRoles(this.borrarM);
                this.insertRoles(this.mostrador, "M");
            }
            this.ocultarRoles();
            location.reload();
        },
        async deleteRoles(id_langilea) {
            try {
                var js = JSON.stringify({ "id_langilea": id_langilea });
                console.log("ezabatuRoles: " + js);

                const response = await fetch(window.ruta + 'roles/ezabatu', {
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

                const response = await fetch(window.ruta + 'roles/txertatu', {
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
        mostrarVentana() {
            document.getElementById('tablaHorarios').style.display = 'block';
            document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
        },
        ocultarRoles() {
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaRoles').style.display = 'none';
        },
        mostrarRoles() {
            document.getElementById('tablaRoles').style.display = 'block';
            document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
        },

        ////////////////////////////////////////////////////////////// P2 CITA //////////////////////////////////////////////////////////////
        // ordenatzerakoan minutuak kontuan hartzeko
        minCalc(minutua) {
            var counter = 0;
            switch (minutua) {
                case '15':
                    counter = +1;
                    break;
                case '30':
                    counter = +2;
                    break;
                case '45':
                    counter = +3;
                    break;
                default:

                    break;
            }
            return counter;
        },

        // Pff, gure datuak taulan ondo kokatzeko
        ordenan() {
            var timeDiff = 0;
            for (let i = 0; i < this.datos2.length; i++) {
                var orduH = this.datos2[i].hasiera_ordua.split(":");
                var orduA = this.datos2[i].amaiera_ordua.split(":");
                var orduDif = (parseInt(orduA[0]) - parseInt(orduH[0])) * 4;
                var minDif = this.minCalc(orduA[1]) - this.minCalc(orduH[1]);
                var timeDif = minDif + orduDif;
                var js = { "izena": this.datos2[i].izena, "deskribapena": this.datos2[i].deskribapena, "orduak": this.datos2[i].hasiera_ordua + "-" + this.datos2[i].amaiera_ordua, "timeDif": timeDif, "visible": true, "disponible": false, "id": this.datos2[i].id, "eserlekua": this.datos2[i].eserlekua};
                console.log(js)

                //Lekuan Kokatu
                for (let i = 0; i < this.taula.length; i++) {
                    if ((orduH[0] + ":" + orduH[1]) == this.orduak[i]) {
                        for (let l = 0; l < js.timeDif; l++) {
                            if (l == 0) {
                                this.taula[i + l][js.eserlekua-1] = js;
                            } else {
                                this.taula[i + l][js.eserlekua-1] = { "visible": false, "disponible": false };
                            }
                        }
                    }
                }
            }
            //Hay que mirar esto, que no lo entiendo :D supuestamente da la vuelta a el array
            // this.taula = this.taula.map(subarray => subarray.slice().reverse());

        },

    // popup-a zabaltzeko eta datuak esleitzeko
        popupCita(id) {
            if(id != undefined){
                this.idCita = id;
                this.dataCita = this.data;
                if (id != '') {
                    this.citaTratamenduaLortu();
                    for (let i = 0; i < this.datos2.length; i++) {
                        if (this.datos2[i].id == id) {
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
                            } else {
                                this.etxekoa = false;
                            }
                        }

                    }
                } else {
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
            }
        },

    // taulako estruktura sortu
        taulaSortu() {
            for (let i = 0; i < this.orduak.length; i++) {
                var row = [];
                for (let j = 0; j < this.langileDisp; j++) {
                    row.push({ "visible": true, "disponible": true });
                }
                this.taula.push(row);
            }
        },

    // Hitzorduak lortu // this.data -> nahi ditugun hitzorduen data // this.bilatusinbol -> if('+'){sartutako data eta berriagoak}else{bakarrik gure datakoak}
        async datuakLortu() {
            this.datos2 = [];
            this.taula = [];
            try {
                const response = await fetch(window.ruta + 'hitzordua/' + this.data + this.bilatusinbol, { method: 'GET'});
                const data = await response.json();
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    // Obtén la referencia de la tabla por su id
                    this.datos2.push(data[i]);
                }
                if (this.bilatusinbol != '+') {
                    this.taulaSortu();
                    this.ordenan();
                } else {
                    this.taula = [];
                    for (let i = 0; i < this.datos2.length; i++) {
                        if (this.datos2[i].izena.startsWith(this.bilatu)) {
                            this.taula.push({
                                "id": this.datos2[i].id,
                                "data": this.datos2[i].data,
                                "hasiera_ordua": this.datos2[i].hasiera_ordua,
                                "amaiera_ordua": this.datos2[i].amaiera_ordua,
                                "izena": this.datos2[i].izena,
                                "telefonoa": this.datos2[i].telefonoa,
                                "deskribapena": this.datos2[i].deskribapena,
                                "etxekoa": this.datos2[i].etxekoa
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Errorea gertatu da:', error);
            }
        },

    // Gaurko data lortzeko
        lortuData() {
            var gaur = new Date();
            var urtea = gaur.getFullYear();
            var hilabetea = gaur.getMonth() + 1;
            var eguna = gaur.getDate();
            var ordua = gaur.getHours();
            if (eguna < 10) {
                eguna = '0' + eguna
            }
            if (hilabetea < 10) {
                hilabetea = '0' + hilabetea
            }
            if (ordua < this.intervaloHoras[1]) {
                this.orduak = this.orduakG;
            } else {
                // this.orduak = this.orduakA;
                this.orduak = this.orduakG;
            }
            // Dar formato :D
            return urtea + '-' + hilabetea + '-' + eguna;
        },

    // Goizeko horduak eskuratzeko
        lortuOrduakG() {
            var mins;
            var orduakaux = [this.intervaloHoras[0], this.intervaloHoras[1]];
            var orduDif = (orduakaux[1] - orduakaux[0]) + 1;
            for (let i = 0; i < orduDif; i++) {
                var aux = orduakaux[0] + i
                for (let j = 0; j < 4; j++) {
                    switch (j) {
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
                        var h = '0' + aux;
                    } else {
                        h = aux;
                    }
                    this.orduakG.push(h + ':' + mins);
                }

            }
        },

        // Tratamendu lista lortu
        async tratamenduakLortu() {
            try {
                const response = await fetch(window.ruta + 'tratamenduak', {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);

                // Si `data` es un arreglo, puedes usar `forEach` para iterar sobre él.
                data.forEach(tratamiento => {
                    console.log(tratamiento);
                    // Asumiendo que `this.tratamenduak` está definido fuera de esta función
                    this.tratamenduak.push(tratamiento);
                });
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },

        // Hitzordu bat dituen tratamendu guztiak lortu
        async citaTratamenduaLortu() {
            this.tratamenduakCitaText = "";
            try {
                const response = await fetch(window.ruta + 'tratamenduak/' + this.idCita, {
                    method: 'GET',
                });

                const data = await response.json();

                console.log(data);
                if (data.message == "Ez dira tratamendurik aurkitu.") {
                    
                }else{
                    this.tratamenduakCita = data;

                    for (let i = 0; i < data.length; i++) {
                        this.tratamenduakCitaText += data[i].tratamenduIzena + " " + data[i].prezioa + " -- ";
                    }
                }

            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },

        // Hitzordak duten tratameduak gehitzeko
        async tratamenduaGehitu() {
            var prezioa = 0;
            if (this.extra == 0) {
                for (let i = 0; i < this.tratamenduak.length; i++) {
                    if (this.tratamenduak[i].id == this.tratamendu) {
                        if (this.etxekoa) {
                            prezioa = this.tratamenduak[i].etxeko_prezioa;
                        } else {
                            prezioa = this.tratamenduak[i].kanpoko_prezioa;
                        }
                    }
                }
            } else {
                prezioa = this.extra;
            }
            var datos = { "id_hitzordua": this.idCita, "id_tratamendua": this.tratamendu, "prezioa": prezioa };
            var js = JSON.stringify(datos);
            console.log("insert: " + js);

            try {
                const response = await fetch(window.ruta + 'tratamenduak/add', {
                    method: 'POST',
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
        async tratamenduaKendu() {
            var datos = "";
            for (let i = 0; i < this.tratamenduakCita.length; i++) {
                if (this.tratamenduakCita[i].id_tratamendua == this.tratamendu) {
                    datos = { "id": this.tratamenduakCita[i].id };
                    break;
                }
            }

            var js = JSON.stringify(datos);
            console.log("del: " + js);
            try {
                const response = await fetch(window.ruta + 'tratamenduak/remove', {
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
    async hitzorduaKendu() {
        const js = JSON.stringify({ "id": this.idCita });
        console.log("froga: " + js);

        try {
            const response = await fetch(window.ruta + 'hitzordua/ezabatu', {
                method: 'PUT',
                body: js
            });

            const data = await response.text();
            console.log(data);

            this.datuakLortu()
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
        }
        this.quitarFondoNegro();
    },

    // Pop-a ren fondo beltza kentzeko
        quitarFondoNegro() {
            document.getElementById('fondoOscuro2').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
            document.getElementById('ventanaEmergenteTiket').style.display = 'none';
        },

    //     // // Langile kopurua lortzeko
        async langileKopLortu() {
            try {
                const response = await fetch(window.ruta + 'alumnos/' + this.data, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);
                this.langileTratamenduLortu(data);
                this.langileDisp = data.length-1;
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },

        async langileTratamenduLortu(alumnos){
            var listaTratamendu = "";
            try {
                for (let i = 0; i < alumnos.length; i++) {
                    const response = await fetch(window.ruta + 'alumnosTratamendu/' + alumnos[i].id, {
                        method: 'GET',
                    });
                    const data = await response.json();
                    console.log(data);
                    for (let j = 0; j < data.length; j++) {
                        listaTratamendu+=(data[j].tratamendu_izena+": "+data[j].kopurua+"\n")
                    }
                    alumnos[i].tratamenduEgin = listaTratamendu
                }
            } catch (error) {
                console.error('Error al obtener los tratamientos de cada alumno:', error);
            }
            this.alumnos = alumnos;
        },
/////////////////////////////////////// HAYQUEACER ///////////////////////////////////////
        createCita() {
            var datos = '/' + this.dataCita + '/' + this.hasiera_ordua + '/' + this.amaiera_ordua;
            console.log("losdatos: " + datos);
            console.log(window.ruta + 'hitzordua/horduDisp' +datos)
            try {
                fetch(window.ruta + 'hitzordua/horduDisp' + datos)
                    .then(response => response.json())
                    .then(data => {
                        // alert(data.length)
                        // alert(this.langileDisp)
                        if (data.length < this.langileDisp) {
                            // Fetch 2
                            var eserlekua = (this.langileDisp+1) - (this.langileDisp - data.length)
                            // alert(eserlekua)
                            const js = JSON.stringify({ "izena": this.izena, "telefonoa": this.telefonoa, "deskribapena": this.deskribapena, "hasiera_ordua": this.hasiera_ordua, "amaiera_ordua": this.amaiera_ordua, "langilea": this.alumnoCitaid, "etxekoa": this.etxekoa, "data": this.dataCita, "eserlekua": eserlekua });
                            console.log("insert: " + js);
                            fetch(window.ruta + 'hitzordua/txertatu', {
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
            // alert("si todo fué bien, es posible que se haya insertado :D");

            this.quitarFondoNegro()
        },

        async aldatuOrduaAmaiera() {
            const js = JSON.stringify({ "id": this.idCita, "ordua": this.amaiera_ordua });
            console.log("froga: " + js);
            try {
                const response = await fetch(window.ruta + 'hitzordua/horduaAmaiera', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);
            } catch (error) {
                console.error("Error al cambiar la hora de fin de la cita: ", error);
            }
        },

        async aldatuOrduaHasiera() {
            const js = JSON.stringify({ "id": this.idCita, "ordua": this.hasiera_ordua });
            console.log("froga: " + js);

            try {
                const response = await fetch(window.ruta + 'hitzordua/horduaHasiera', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);
            } catch (error) {
                console.error("Error al cambiar la hora de inicio de la cita: ", error);
            }
        },

        async aldatuLangilea() {
            const js = JSON.stringify({ "id": this.idCita, "langilea": this.alumnoCitaid });
            console.log("froga: " + js);

            try {
                const response = await fetch(window.ruta + 'hitzordua/aldatuLangilea', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);
            } catch (error) {
                console.error("Error al cambiar la hora de inicio de la cita: ", error);
            }
        },

        popupTicket() {
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
            document.getElementById('fondoOscuro2').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteTiket').style.display = 'block';
        },

        hizkuntzaLortu() {
            var value = sessionStorage.getItem('hizkuntza');
            return value !== null ? value : 'ESP';
        },

    //     // // fichaSortu(){
    //     // //   sensible = confirm('Tiene el cuero cabelludo sensible¿')
    //     // //   alert('ficha sortuta '+ sensible);
    //     // //   izenabizen = this.izena.split(' ');
    //     // //   abizena = '';
    //     // //   for (let i = 1; i < izenabizen.length; i++) {
    //     // //     abizena = izenabizen[i] + ' ';

    //     // //   }
    //     // //   js = JSON.stringify({'izena': izenabizen[0],	'abizena': abizena,	'telefonoa': this.telefonoa,	'azal_sentikorra': sensible})
    //     // //   console.log('Ficha'+js)
    //     // // },

    },
    watch: {
        data: function () {
            this.dataCita = this.data;
            this.langileKopLortu().then(() => {
                this.datuakLortu();
            });
            
        },

        bilatu: function () {
            if (this.bilatu == '') {
                this.bilatusinbol = '';
                this.datuakLortu();
            } else {
                this.bilatusinbol = '+';
                this.datuakLortu();
            }

        },

        alumnoCitaid: function () {
            this.aldatuLangilea()
        },

        langileDisp: function () {
            this.taulaSortu()
        },

        tratamendu: function () {
            this.extra = 0;
        },

        hasiera_ordua: function () {
            this.aldatuOrduaHasiera();
        },

        amaiera_ordua: function () {
            this.aldatuOrduaAmaiera();
        },

        tratamenduakCita: function () {
            this.totalPrezioa = 0;
            this.tratamenduakCita.forEach(element => {
                this.totalPrezioa = + this.totalPrezioa + +element.prezioa;
            });
        },

        mostrador: function(){
            this.langileaLortu(this.mostrador,'mostrador')
        },

        limpieza: function(){
            this.langileaLortu(this.limpieza,'limpieza')
            
        }

    },
    mounted: function () {
        this.hizkuntza = this.hizkuntzaLortu();
        this.data = this.lortuData();
        this.nombresGrupo();
        this.lortuOrduakG();
        
        this.hoy = this.data;
        this.grupoSeleccionado().then(() => {
            this.tablaRoles();
        });
        this.tratamenduakLortu();

    }
}
</script>

<template>
    <div class="contenido" id="orrialdea"></div>

    <!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx BOTONES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->

    <div class="home" id="home">
        <div class="containerPage" id="upHorario">
            <div class="input-group">
                <input type="date" id="fecha" name="fecha"  class="form-control buscar" style="margin-right: 55vh;" v-model="data">
                <input type="text" class="form-control buscar" :placeholder="testua[hizkuntza]?.['BuscarxNombre']" v-model="bilatu">
                <div class="input-group-append">
                    <button class="btn lupa" type="button">
                        <i class="bi bi-search"></i>
                    </button>
                    <button type="button" class="btn añadir btn-lg" @click="popupCita('')">{{ testua[hizkuntza]?.['NuevaCita'] }}</button>
                    <button type="button" id="editarRoles" class="btn añadir btn-lg" @click="mostrarRoles">{{ testua[hizkuntza]?.['AsignarRoles'] }}</button>
                    <button type="button" id="editarHorarios" class="btn añadir btn-lg" @click="mostrarVentana()">{{ testua[hizkuntza]?.['EditarHorario'] }}</button>
                </div>
            </div>

            <div id="fondoOscuro" class="fondo-ocultoHorarios" @click="ocultarVentana(), ocultarRoles()"></div>

            <!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx HORARIOS xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->

            <div class="tablaHorarios" id="tablaHorarios">

                <div class="contenidoTabla">
                    <div class="input-group-horarios">
                        <button type="button" id="cerrarHorarios" class="btn x" @click="ocultarVentana()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <table id="tabla" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">{{ testua[hizkuntza]?.['Dia'] }}</th>
                                <th scope="col">{{ testua[hizkuntza]?.['Grupo'] }}</th>
                                <th scope="col">{{ testua[hizkuntza]?.['FechaInicio'] }}</th>
                                <th scope="col">{{ testua[hizkuntza]?.['FechaFin'] }}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ testua[hizkuntza]?.['Lunes'] }}</td>
                                <td>
                                    <select class="form-select combobox" aria-label="Default select example"
                                        v-model="dias[0]">
                                        <!-- <option :value="grupo[0].IZENA" selected>{{ grupo[0].IZENA }}</option> -->
                                        <!-- <option selected>a</option> -->
                                        <!-- <option   v-for="(grupos,index) in grupo" :key="index" :value="grupos.IZENA" >{{ grupos.IZENA }}</option> -->
                                        <option v-for="(dato, index) in datos" :key="index" :value="dato.izena">{{dato.izena}}</option>
                                    </select>
                                </td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[0].HASIERA_DATA"></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[0].AMAIERA_DATA"></td>
                                <td><button type="button" class="btn papelera btn-sm" @click="eliminar(1)"><i
                                            class="bi bi-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td>{{ testua[hizkuntza]?.['Martes'] }}</td>
                                <td><select class="form-select combobox" aria-label="Default select example"
                                        v-model="dias[1]">
                                        <option v-for="(dato, index) in datos" :key="index" :value="dato.izena">{{dato.izena}}</option>
                                    </select></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[1].HASIERA_DATA"></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[1].AMAIERA_DATA"></td>
                                <td><button type="button" class="btn papelera btn-sm" @click="eliminar(2)"><i
                                            class="bi bi-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td>{{ testua[hizkuntza]?.['Miércoles'] }}</td>
                                <td><select class="form-select combobox" aria-label="Default select example"
                                        v-model="dias[2]">
                                        <option v-for="(dato, index) in datos" :key="index" :value="dato.izena">{{dato.izena}}</option>
                                    </select></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[2].HASIERA_DATA"></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[2].AMAIERA_DATA"></td>
                                <td><button type="button" class="btn papelera btn-sm" @click="eliminar(3)"><i
                                            class="bi bi-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td>{{ testua[hizkuntza]?.['Jueves'] }}</td>
                                <td><select class="form-select combobox" aria-label="Default select example"
                                        v-model="dias[3]">
                                        <option v-for="(dato, index) in datos" :key="index" :value="dato.izena">{{dato.izena}}</option>
                                    </select></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[3].HASIERA_DATA"></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[3].AMAIERA_DATA"></td>
                                <td><button type="button" class="btn papelera btn-sm" @click="eliminar(4)"><i
                                            class="bi bi-trash"></i></button></td>
                            </tr>
                            <tr>
                                <td>{{ testua[hizkuntza]?.['Viernes'] }}</td>
                                <td><select class="form-select combobox" aria-label="Default select example"
                                        v-model="dias[4]">
                                        <option v-for="(dato, index) in datos" :key="index" :value="dato.izena">{{dato.izena}}</option>
                                    </select></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[4].HASIERA_DATA"></td>
                                <td><input type="date" id="birthday" name="birthday" v-model="fecha[4].AMAIERA_DATA"></td>
                                <td><button type="button" class="btn papelera btn-sm" @click="eliminar(5)"><i
                                            class="bi bi-trash"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="input-group-horarios">
                        <button type="button" id="aceptarHorarios" class="btn añadir btn-lg"
                            @click="aceptarCambios()">Aceptar</button>
                        <button type="button" id="cancelarHorarios" class="btn cancelar btn-lg"
                            @click="ocultarVentana()">Cancelar</button>
                    </div>
                </div>
            </div>

            <!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ROLES xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->

            <div class="tablaRoles" id="tablaRoles">
                <div class="contenidoTabla">
                    <div class="row">
                        <div class="col">
                            <h2>{{ testua[hizkuntza]?.['Grupo'] }}: <span v-text="grupoHoy"></span></h2>
                        </div>

                        <div class="col input-group-horarios">
                            <button type="button" id="cerrarHorarios" class="btn x" @click="ocultarRoles()">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </div>


                    <div class="row align-items-start">
                        <div class="col-md-7">
                            <table id="tabla" class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">{{ testua[hizkuntza]?.['Alumno'] }}</th>
                                        <th scope="col">{{ testua[hizkuntza]?.['Limpieza'] }}</th>
                                        <th scope="col">{{ testua[hizkuntza]?.['Mostrador'] }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in datosRoles" :key="index" :id="data.id_langilea">
                                        <td>{{ data.izena }} {{ data.abizenak }}</td>
                                        <td>{{ data.suma_g }}</td>
                                        <td>{{ data.suma_m }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-5">
                            <h2 style="background-color: #1ab7bc;">{{ testua[hizkuntza]?.['AsignarRoles'] }}</h2>
                            <hr>
                            <div class="row">
                                <div class="col">
                                    <h3>{{ testua[hizkuntza]?.['Mostrador'] }}</h3>
                                    <div class="form-floating">
                                        <select class="form-select combobox" id="floatingSelect"
                                            aria-label="Floating label select example" v-model="mostrador">
                                            <option v-for="(data, index) in datosRoles" :key="index"
                                                :value="data.id_langilea">{{ data.izena }} {{ data.abizenak }}</option>
                                        </select>
                                        <label for="floatingSelect">Works with selects</label>
                                    </div>
                                </div>
                                <div class="col">
                                    <h3>{{ testua[hizkuntza]?.['Limpieza'] }}</h3>
                                    <div class="form-floating">
                                        <select class="form-select combobox" id="floatingSelect"
                                            aria-label="Floating label select example" v-model="limpieza">
                                            <option v-for="(data, index) in datosRoles" :key="index"
                                                :value="data.id_langilea">{{ data.izena }} {{ data.abizenak }}</option>
                                        </select>
                                        <label for="floatingSelect">Works with selects</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="input-group-horarios">
                        <button type="button" id="aceptarHorarios" class="btn añadir btn-lg"
                            @click="aceptarRoles()">{{ testua[hizkuntza]?.['Aceptar'] }}</button>
                        <button type="button" id="cancelarHorarios" class="btn cancelar btn-lg"
                            @click="ocultarRoles()">{{ testua[hizkuntza]?.['Cancelar'] }}</button>
                    </div>
                </div>
            </div>

        </div>

        <div class="container">
            <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx Horarios xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
            <div id="horario2" class="horario2">
                <!--  -->
                <div @click="quitarFondoNegro" id="fondoOscuro2" class="fondo-oculto"></div>
                <div id="ventanaEmergenteLangile" class="ventana-oculta"
                    style="background-color: #ddf5f3; width: 50vw; border-radius: 25px;">
                    <div class="input-group-horarios">
                        <button type="button" id="cerrarVentanaLangile" class="btn x" @click="quitarFondoNegro">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <form class="row g-3 p-5">
                        <!-- Primera Fila -->
                        <div class="col-md-12">
                            <div class="row g-3">
                                <div class="col">
                                    <label class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Nombre'] }}: </label>
                                </div>
                                <div class="col">
                                    <div class="form-check-reverse form-switch d-flex justify-content-center">
                                        <label class="form-check-label rounded bg-white p-2 mx-2 mb-1 text-center">{{ testua[hizkuntza]?.['DelCentro'] }}</label>
                                        <input class="form-check-input"
                                            style="margin-top: 1.4vh; background-color: #1ab7bc; border-color: #1ab7bc;"
                                            type="checkbox" v-model="etxekoa" :disabled="idCita != ''">
                                    </div>
                                </div>
                            </div>
                            <input type="text" class="form-control" v-model="izena" :disabled="idCita != ''"
                                style="background-color: white;">
                        </div>
                        <!-- Segunda Fila -->
                        <div class="col-md-12">
                            <div class="input-group" style="margin: 0;">
                                <span class="input-group-text">{{ testua[hizkuntza]?.['Hora-Inicio'] }}</span>
                                <input type="time" class="form-control" v-model="hasiera_ordua">
                                <span class="input-group-text">{{ testua[hizkuntza]?.['Hora-Fin'] }}</span>
                                <input type="time" class="form-control" v-model="amaiera_ordua">
                                <span class="input-group-text">{{ testua[hizkuntza]?.['Fecha'] }}</span>
                                <input type="date" class="form-control" :disabled="idCita != ''"
                                    style="background-color: white;" v-model="dataCita">
                            </div>
                        </div>
                        <!-- Tercera Fila -->
                        <div class="col-12">
                            <label for="inputAddress" class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Telefono'] }}:</label>
                            <input type="text" class="form-control" v-model="telefonoa" :disabled="idCita != ''"
                                style="background-color: white;">
                        </div>
                        <!-- Cuarta Fila -->
                        <div v-if="data <= hoy" class="col-md-4">
                            <label v-if="dataCita == hoy" class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Grupo'] }}:
                                {{ grupoHoy }}</label>
                            <label v-else class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Grupo'] }}: {{ grupoCita }}</label>

                            <!-- <select class="form-select">
                                <option selected disabled value="">Grupo</option>
                                <option>...</option>
                                </select> -->
                        </div>
                        <div v-if="data <= hoy" class="col-md-8">
                            <!-- <label v-if="data == hoy" class="form-label rounded bg-white p-2 mb-1">Alumno</label> -->
                            <select v-if="dataCita == hoy" class="form-select" v-model="alumnoCitaid">
                                <option selected disabled value="13">{{ testua[hizkuntza]?.['Alumno'] }}</option>
                                <option v-for="(datos, index) in alumnos" :key="index" :value="datos.id" :title="datos.tratamenduEgin">
                                    {{ datos.izena }}
                                </option>
                            </select>
                            <label v-else class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Alumno'] }}: {{ alumnoCita }}</label>
                        </div>
                        <!-- Quinta Fila -->
                        <div class="col-md-12">
                            <div class="row g-3" style="display: inline-flex;" v-if="idCita != ''">
                                <div class="col">
                                    <label class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Tratamiento'] }}: </label>
                                </div>
                                <div class="col">
                                    <select class="form-select" style="min-width: 15vw;" v-model="tratamendu">
                                        <option selected disabled value="">{{ testua[hizkuntza]?.['Tratamientos'] }}</option>
                                        <option v-for="tratamendus in tratamenduak" :value="tratamendus.id"
                                            :key="tratamendus.izena">{{ tratamendus.izena }}</option>
                                    </select>
                                </div>
                                <div class="col" v-if="tratamendu == '0'">
                                    <input class="form-control" type="number" v-model="extra">
                                </div>
                                <div class="col">
                                    <button class="btn" style="background-color: #1ab7bc;" type="button"
                                        @click="tratamenduaGehitu">+</button>
                                    <button class="btn" style="background-color: #1ab7bc;" type="button"
                                        @click="tratamenduaKendu">-</button>
                                </div>
                            </div>
                            <textarea class="form-control" disabled style="background-color: white;"
                                v-if="idCita != ''">{{ tratamenduakCitaText }}</textarea>
                        </div>
                        <!-- Sexta Fila -->
                        <div class="col-12">
                            <label for="inputAddress" class="form-label rounded bg-white p-2 mb-1">{{ testua[hizkuntza]?.['Observaciones'] }}:</label>
                            <textarea class="form-control" v-model="deskribapena" :disabled="idCita != ''"
                                style="background-color: white;"></textarea>
                        </div>
                        <!-- Fin -->
                        <div class="col-12">
                            <button v-if="idCita != ''" class="btn" type="button" style="background-color: #1ab7bc; margin-right: 2vw;"
                                @click="hitzorduaKendu">Eliminar</button>
                            <button v-else class="btn" type="button" style="background-color: #1ab7bc;"
                                @click="createCita">Crear</button>
                            <button v-if="idCita != ''" class="btn" type="button" style="background-color: #1ab7bc;"
                                @click="popupTicket">{{ testua[hizkuntza]?.['GenerarTiket'] }}</button>
                        </div>
                    </form>
                </div>
                <!-- taula testuarekin -->
                <br>
                <div class="table-responsive-xl">
                    <table class="table table-hover table-striped" v-if="bilatu != ''">
                        <thead>
                            <th scope="col">id</th>
                            <th scope="col">{{ testua[hizkuntza]?.['Fecha'] }}</th>
                            <th scope="col">{{ testua[hizkuntza]?.['Hora-Inicio'] }}</th>
                            <th scope="col">{{ testua[hizkuntza]?.['Hora-Fin'] }}</th>
                            <th scope="col">{{ testua[hizkuntza]?.['Nombre'] }}</th>
                            <th scope="col">{{ testua[hizkuntza]?.['Telefono'] }}</th>
                            <th scope="col">{{ testua[hizkuntza]?.['Observaciones'] }}</th>
                            <th scope="col">{{ testua[hizkuntza]?.['DelCentro'] }}</th>
                            <th scope="col"></th>
                        </thead>
                        <tbody>
                            <tr v-for="(dato, index) in taula" @click="popupCita(dato.id)">
                                <td scope="col">{{ dato.id }}</td>
                                <td scope="col">{{ dato.data }}</td>
                                <td scope="col">{{ dato.hasiera_ordua }}</td>
                                <td scope="col">{{ dato.amaiera_ordua }}</td>
                                <td scope="col">{{ dato.izena }}</td>
                                <td scope="col">{{ dato.telefonoa }}</td>
                                <td scope="col">{{ dato.deskribapena }}</td>
                                <td scope="col">{{ dato.etxekoa }}</td>
                                <td>
                                    <i class="bi bi-trash-fill"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--        taula ordutegia    -->
                    <table class="table" v-else>
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th v-for="(dato, index) in taula[0]" scope="col" class="text-center">{{ index + 1 }}</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dato, index) in orduak">
                                <th v-if="index % 4 === 0" :rowspan="4" scope="col">{{ dato }}</th>
                                <!-- cambiar 4 por 2 para que sea cada 30 mins --> 
                                <!-- Opciones de colores rgb(26, 183, 188,0.5) #bbbeef  #f5fff7-->
                                <td v-for="(dato2, index2) in taula[index]" :key="index2" v-if=" !(dato2?.visible)" v-show="dato2.visible" :rowspan="dato2.timeDif" @click="popupCita(dato2.id)" :style="{ backgroundColor: (Object.keys(dato2).length > 2) ? '#bbbeef' : '#FFFFFF', border: (Object.keys(dato2).length > 2) ? '2px solid black' : '1px solid #dfe2e6' }">
                                    <template v-if="taula[index][index2] && Object.keys(dato2).length > 2" @click="popupCita(dato2.id)" scope="col">
                                        {{ dato2.izena }}<br>{{ dato2.orduak }}<br>{{ dato2.deskribapena }} {{ Object.keys(dato2).length }}
                                    </template>
                                    <template v-else-if="dato2.visible">
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
            <!-- Ticket -->
            <div id="ventanaEmergenteTiket" class="ventana-oculta"
                style="background-color: #F4E3C8; width: 50vw; border-radius: 25px;">
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaLangile" class="btn x" @click="quitarFondoNegro">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <form class="row g-3 p-5">
                    <!-- Primera Fila -->
                    <div class="col-md-12">
                        <div class="row g-3">
                            <div class="col">
                                <label class="form-label rounded bg-white p-2 mb-1">Nombre: </label>
                                <input type="text" class="form-control" v-model="izena" disabled
                                    style="background-color: white;">
                            </div>
                            <div class="col">
                                <label for="inputAddress" class="form-label rounded bg-white p-2 mb-1">Telefono:</label>
                                <input type="text" class="form-control" v-model="telefonoa" disabled
                                    style="background-color: white;">
                            </div>
                        </div>

                    </div>
                    <!-- Quinta Fila -->
                    <div class="col-md-12">
                        <div class="row g-3" style="display: inline-flex;">
                            <div class="col">
                                <label class="form-label rounded bg-white p-2 mb-1">Tratamientos: </label>
                            </div>
                        </div>
                        <ul class="list-group">
                            <li v-for="(dato, index) in tratamenduakCita" :key="index"
                                class="list-group-item d-flex justify-content-between align-items-center">
                                {{ dato.tratamenduIzena }}
                                <span class="badge bg-primary rounded-pill">{{ dato.prezioa }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-12 d-flex justify-content-end">
                        <label class="form-label rounded bg-white p-2 mb-1 mx-2">Precio: </label>
                        <label class="form-label rounded p-2 mb-1"
                            style="background-color: #e9995798;">{{ totalPrezioa }}€</label>
                    </div>
                    <button v-if="idCita != ''" class="btn mx-2" type="button" style="background-color: #1ab7bc;"
                        @click="quitarFondoNegro">Aceptar</button>
                </form>
            </div>
        </div>
    </div>
</template>