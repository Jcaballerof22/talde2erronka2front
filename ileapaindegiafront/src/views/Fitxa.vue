<script>
export default {
    data() {
        return {
            datosFichas: [],
            taula: [],
            id: "",
            izena: "",
            abizena: "",
            telefonoa: "",
            azal_sentikorra: "",
            sortze_data: "",
            funtzio: "",
            bilatu: '',
            fechaInicio: '',
            fechaFin: ''
        };
    },
    methods: {
        // Fitxen datuak lortzeko metodoa
        async sacarFichas() {
            try {
                const response = await fetch(window.ruta + 'fichas', { method: 'GET' });
          
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }
          
                const data = await response.json();
          
                for (let i = 0; i < data.length; i++) {
                    this.datosFichas.push({"id" : data[i].id, "izena" : data[i].izena, "abizena" : data[i].abizena, "telefonoa" : data[i].telefonoa, "azal_sentikorra" : data[i].azal_sentikorra, "sortze_data" : data[i].sortze_data});
                    this.taula.push({"id" : data[i].id, "izena" : data[i].izena, "abizena" : data[i].abizena, "telefonoa" : data[i].telefonoa, "azal_sentikorra" : data[i].azal_sentikorra, "sortze_data" : data[i].sortze_data});
                }
            } catch (error) {
                console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Fitxa berria sortzeko edo fitxa bat editatu behar den jakiteko metodoa
        txertatuEdoAldatu(){
            if(this.funtzio == 'aldatu'){
                this.aldatuDatuak();
            }else{
                this.txertatuFichak(); 
            }
        },
        // Fitxa berri bat sortzeko metodoa
        async txertatuFichak() {
            if (this.izena === "") {
                alert("Falta el dato");
            } else {
                try {
                    const js = JSON.stringify({"izena": this.izena, "abizena": this.abizena, "telefonoa": this.telefonoa, "azal_sentikorra": this.azal_sentikorra}); 
                    console.log("froga: " + js);

                    const response = await fetch(window.ruta + 'fichas/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'no-cors'
                    });

                    const data = await response.text();
                    console.log(data);

                    var fecha = new Date();

                    // Data lortu (urtea, hilabetea, eguna, ordua, minutua, segundua)
                    var año = fecha.getFullYear();
                    var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
                    var dia = ('0' + fecha.getDate()).slice(-2);
                    var hora = ('0' + fecha.getHours()).slice(-2);
                    var minuto = ('0' + fecha.getMinutes()).slice(-2);
                    var segundo = ('0' + fecha.getSeconds()).slice(-2);

                    // Data 'yyyy-mm-dd hh:mm:ss' formatuan
                    var fechaFormateada = año + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;

                    var azala = 'E';

                    if(this.azal_sentikorra){
                        azala = 'B';
                    }

                    this.taula.push({"id" : this.id, "izena" : this.izena, "abizena" : this.abizena, "telefonoa" : this.telefonoa, "azal_sentikorra" : azala, "sortze_data" : fechaFormateada});

                    this.cerrarPopup();

                } catch (error) {
                    console.error("Error al añadir el dato:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },
        // Fitxa bat editatzeko metodoa
        async aldatuDatuak() {
            const js = JSON.stringify({"id": this.id, "izena": this.izena, "abizena": this.abizena, "telefonoa": this.telefonoa, "azal_sentikorra": this.azal_sentikorra}); 
            console.log("froga: " + js);

            var azala = 'E';

            if(this.azal_sentikorra){
                azala = 'B';
            }

            for (let i = 0; i < this.taula.length; i++) {
                if(this.taula[i].id == this.id){
                    this.taula[i].izena = this.izena;
                    this.taula[i].abizena = this.abizena;
                    this.taula[i].telefonoa = this.telefonoa;
                    this.taula[i].azal_sentikorra = azala;
                }
            }
          
            try {
                const response = await fetch(window.ruta + 'fichas/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
            this.cerrarPopup();
        },
        // Fitxa bat ezabatzeko metodoa
        async ezabatu(kodea, index) {
            const js = JSON.stringify({"id": kodea}); 
            console.log("froga: " + js);

            this.taula.splice(index, 1);
          
            try {
                const response = await fetch(window.ruta + 'fichas/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        // POPUPa irekitzeko metodoa
        abrirPopup(kodea, id, funtzio){
            this.funtzio = funtzio;

            if(kodea != ''){
                this.id = id;
                this.izena=this.datosFichas[kodea].izena;
                this.abizena=this.datosFichas[kodea].abizena;
                this.telefonoa=this.datosFichas[kodea].telefonoa;
                if(this.datosFichas[kodea].azal_sentikorra == 'B'){
                    this.azal_sentikorra=true;
                }else{
                    this.azal_sentikorra=false;
                }
            }
           
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteFichas').style.display = 'block';
        },
        // POPUPa ixteko metodoa
        cerrarPopup(){
            this.izena = '';
            this.abizena = '';
            this.telefonoa = '';
            this.azal_sentikorra = false;
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteFichas').style.display = 'none';
        },

        //Izenaren eta dataren arabera filtroak egiteko metodoa
        buscar(){
            let fechaFin = new Date(this.fechaFin);
            fechaFin = fechaFin.setDate(fechaFin.getDate() + 1);

            //Egiaztatzen du erabiltzaileak filtroan zerbait idatzi duela
            if(this.bilatu == ''){
                //Erabiltzaileak ez badu ezer idatzi, hasiera eta amaiera data ezarrita daudela egiaztatzen du.
                if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                    this.taula = [];

                    //Hasiera eta amaiera datak ezarrita badaude, data hoien artean dauden datuak bilatuko ditu.
                    for (let i = 0; i < this.datosFichas.length; i++){
                        if(new Date(this.datosFichas[i].sortze_data) >= new Date(this.fechaInicio) && new Date(this.datosFichas[i].sortze_data) <= fechaFin){
                            this.taula.push({
                                "id" : this.datosFichas[i].id, 
                                "izena" : this.datosFichas[i].izena, 
                                "abizena" : this.datosFichas[i].abizena, 
                                "telefonoa" : this.datosFichas[i].telefonoa, 
                                "azal_sentikorra" : this.datosFichas[i].azal_sentikorra, 
                                "sortze_data" : this.datosFichas[i].sortze_data
                            });
                        }
                    }
                }else{
                    //Hasiera edo amaiera data ez badaude ezarrita, datu guztiak bistaratuko dira.
                    this.taula = this.datosFichas;
                }
                
            }else{
                //Erabiltzaileak filtroan zerbait idatzi badu, idatzitako izenaren arabera bilaketa egingo du.
                this.taula = [];
                for (let i = 0; i < this.datosFichas.length; i++){
                    if(this.datosFichas[i].izena.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                        if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                            if(new Date(this.datosFichas[i].sortze_data) >= new Date(this.fechaInicio) && new Date(this.datosFichas[i].sortze_data) <= fechaFin){
                                this.taula.push({
                                    "id" : this.datosFichas[i].id, 
                                    "izena" : this.datosFichas[i].izena, 
                                    "abizena" : this.datosFichas[i].abizena, 
                                    "telefonoa" : this.datosFichas[i].telefonoa, 
                                    "azal_sentikorra" : this.datosFichas[i].azal_sentikorra, 
                                    "sortze_data" : this.datosFichas[i].sortze_data
                                });                            }
                        }else{
                            this.taula.push({
                                "id" : this.datosFichas[i].id, 
                                "izena" : this.datosFichas[i].izena, 
                                "abizena" : this.datosFichas[i].abizena, 
                                "telefonoa" : this.datosFichas[i].telefonoa, 
                                "azal_sentikorra" : this.datosFichas[i].azal_sentikorra, 
                                "sortze_data" : this.datosFichas[i].sortze_data
                            });                        
                        }
                    }
                }
            }
        }
      
    },
    
    watch:{
        //Izenaren filtroan zerbait idazten den bakoitzean funtzioa egingo du.
        bilatu: function(){
            this.buscar();
        },

        //Hasiera data aldatzen den bakoitzean funtzioa egingo du.
        fechaInicio: function(){
            this.buscar();
        },

        //Amaiera data aldatzen den bakoitzean funtzioa egingo du.
        fechaFin: function(){
            this.buscar();
        }
    },
    mounted: function() {
        this.sacarFichas();
      }
};

</script>

<template>
    <div id="fondoOscuroLangile" class="fondo-oculto" @click="cerrarPopup"></div>
        <div class="contenido" id="orrialdea"></div>
        <div class="containerPage">
            <div class="input-group-estadisticas">
                
                    <!-- Izenaren arabera bilatzeko eta fitxa berria gehitzeko botoia -->
                    <div class="input-group">
                        <div class="me-4">
                            <h4>De 
                            <input type="date" id="birthday" name="birthday" v-model="fechaInicio">
                            a 
                            <input type="date" id="birthday" name="birthday" v-model="fechaFin">
                            </h4>
                        </div>
                        <input type="text" class="form-control buscar" placeholder="Buscar por nombre" v-model="bilatu">
                        <div class="input-group-append">
                            <button class="btn lupa" type="button">
                                <i class="bi bi-search"></i>
                            </button>
                            <button type="button" class="btn añadir btn-lg" @click="abrirPopup('', 'txertatu')">Añadir Ficha</button>
                        </div>
                    </div>
                
            </div>
            <!-- Fitxen taula -->
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Piel sensible</th>
                        <th scope="col">Fecha de creación</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index" :id="dato.izena">
                            <td @click="abrirPopup(index, dato.id, 'aldatu')">{{dato.izena}} {{dato.abizena}}</td>
                            <td @click="abrirPopup(index, dato.id, 'aldatu')">{{dato.telefonoa}}</td>
                            <td @click="abrirPopup(index, dato.id, 'aldatu')">{{dato.azal_sentikorra}}</td>
                            <td @click="abrirPopup(index, dato.id, 'aldatu')">{{dato.sortze_data}}</td>
                            <td>
                                <i class="bi bi-trash-fill" @click="ezabatu(dato.id, index)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            
            <!-- Fitxa berriak gehitzeko POPUP -->
            <div id="ventanaEmergenteFichas" class="ventana-oculta">
                <div class="contenido-ventana">
                    <div class="input-group-horarios">
                        <button type="button" id="cerrarVentanaLangile" class="btn x" @click="cerrarPopup()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="mt-5">
                        <label for="mensaje" id="nombreLabelLangile">Cliente</label>
                    </div>
                    <div class="row d-flex mt-4">
                        <div class="col">
                            <textarea type="text" id="nombreTextoLangile" name="mensaje" rows="1" cols="25" placeholder="Ingresa el nombre aquí" v-model="izena"></textarea>
                        </div>
                        <div class="col">
                            <textarea id="nombreTextoLangile" name="mensaje" rows="1" cols="25" placeholder="Ingresa el apellido aquí" v-model="abizena"></textarea>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="mensaje" id="apellidoLabelLangile">Teléfono</label>
                    </div>
                    <div class="mt-4">
                        <textarea id="apellidoTextoLangile" name="mensaje" rows="1" cols="50" placeholder="Ingresa el apellido aquí" v-model="telefonoa"></textarea>
                    </div>
                    <div class="col-md-12">
                        <div class="row g-3">
                            <div class="col">
                                <div class="form-check-reverse form-switch d-flex justify-content-left">
                                    <label class="form-check-label rounded bg-white p-2 mx-2 mb-1 text-center">Piel sensible</label>
                                    <input class="form-check-input" style="margin-top: 1.4vh;" type="checkbox" v-model="azal_sentikorra">
                                </div>                        
                            </div>
                        </div>
                    </div>
                    <input id="submitLangile" type="submit" class="btn añadir btn-lg mt-4" @click="txertatuEdoAldatu" value="Aceptar">
                </div>
            </div>
        </div>
</template>