<script>
export default {
    data() {
        return {
            datosTickets: [],
            taula: [],
            tratamenduak: [],
            id: '',
            izena: '',
            tratamendu_izena: '',
            prezioa: '',
            id_tratamendua: '',
            data: '',
            bilatu: '',
            fechaInicio: '',
            fechaFin: ''
            };
    },
    methods: {
        // Ticketen datuak lortzeko metodoa
        async mostrarTickets() {
            try {
              const response = await fetch(window.ruta + `tickets`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.datosTickets.push({
                  "bezero_izena": data[i].bezero_izena,
                  "data": data[i].data,
                  "tratamendu_izena": data[i].tratamendu_izena,
                  "prezioa": data[i].prezioa,
                  "id": data[i].id
                });

                this.taula.push({
                    "bezero_izena": data[i].bezero_izena,
                    "data": data[i].data,
                    "tratamendu_izena": data[i].tratamendu_izena,
                    "prezioa": data[i].prezioa,
                    "id": data[i].id
                });
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Ticketak ezabatzeko metodoa
        async ezabatu(kodea, index) {
            const js = JSON.stringify({"id": kodea}); 
            console.log("froga: " + js);
            console.log(index);
  
            this.taula.splice(index, 1);
            for (let i = 0; i < this.taula.length; i++) {
                console.log(this.taula[i].bezero_izena);
            }
            
            try {
                const response = await fetch(window.ruta + 'tickets/ezabatu', {
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
        // Ticketak editatzeko metodoa
        async aldatuDatuak() {
            for (let i = 0; i < this.tratamenduak.length; i++) {
                if(this.tratamendu_izena == this.tratamenduak[i].izena){
                    this.id_tratamendua = this.tratamenduak[i].id;
                }
            }

            const js = JSON.stringify({"id": this.id, "prezioa": this.prezioa, "id_tratamendua": this.id_tratamendua});
            console.log("froga: " + js);
  
            for (let i = 0; i < this.taula.length; i++) {
              if(this.taula[i].id == this.id){
                this.taula[i].data = this.data;
                this.taula[i].prezioa = this.prezioa;
                this.taula[i].tratamendu_izena = this.tratamendu_izena;
              }
            }
            
            try {
                const response = await fetch(window.ruta + 'tickets/editatu', {
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
        // Tratamenduen datuak lortzeko metodoa
        async tratamenduakLortu() {
            try {
                const response = await fetch(window.ruta + 'tratamenduak', {
                    method: 'GET',
                });
                
                const data = await response.json();
                
                data.forEach(tratamiento => {
                    this.tratamenduak.push(tratamiento);
                });
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },
        // POPUPa irekitzeko metodoa
        abrirPopup(index, id){
            if(index !== ''){
                this.id = id;
                this.izena = this.taula[index].bezero_izena;
                this.tratamendu_izena = this.taula[index].tratamendu_izena;
                this.prezioa = this.taula[index].prezioa;
                this.data = this.taula[index].data;
            }
             
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteTickets').style.display = 'block';
        },
        // POPUPa ixteko metodoa
        cerrarPopup(){
            this.id = '';
            this.izena = '',
            this.tratamendu_izena = '',
            this.prezioa = '';
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteTickets').style.display = 'none';
        },
        //Dataren arabera sailkatzeko filtroa
        bilatuData(){
            //Egiaztatzen du erabiltzaileak hasiera eta amaiera datak sartu dituela
            if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                console.log('hola');
                this.taula = [];
                for (let i=0; i < this.datosTickets.length; i++){
                    //Hasiera eta amaiera daten artean dauden datuak bilatzen eta inprimatzen ditu
                    if(new Date(this.datosTickets[i].data) >= new Date(this.fechaInicio) && new Date(this.datosTickets[i].data) <= new Date(this.fechaFin)){
                        this.taula.push({
                            "bezero_izena": this.datosTickets[i].bezero_izena,
                            "data": this.datosTickets[i].data,
                            "tratamendu_izena": this.datosTickets[i].tratamendu_izena,
                            "prezioa": this.datosTickets[i].prezioa,
                            "id": this.datosTickets[i].id
                        });
                    }
                }
            }else{
                this.taula = this.datosTickets;
            }
        }
    },
    watch:{
        //Izenaren arabera bilatzeko filtroa
        bilatu: function(){
            if (this.bilatu == ''){
                //Kontuan hartzen du dataren filtroa erabiltzen ari bada edo ez
                if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                    this.taula = [];
                    for (let i=0; i < this.datosTickets.length; i++){
                        if(new Date(this.datosTickets[i].data) >= new Date(this.fechaInicio) && new Date(this.datosTickets[i].data) <= new Date(this.fechaFin)){
                            this.taula.push({
                                "bezero_izena": this.datosTickets[i].bezero_izena,
                                "data": this.datosTickets[i].data,
                                "tratamendu_izena": this.datosTickets[i].tratamendu_izena,
                                "prezioa": this.datosTickets[i].prezioa,
                                "id": this.datosTickets[i].id
                            });
                        }
                    }
                }else{
                    this.taula = this.datosTickets;
                }
            }else{
                this.taula = [];
                for (let i = 0; i < this.datosTickets.length; i++){
                    //Sartutako izenaren arabera filtroa egiten du
                    if(this.datosTickets[i].bezero_izena.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                        //Kontuan hartzen du dataren filtroa erabiltzen ari bada edo ez
                        if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                            if(new Date(this.datosTickets[i].data) >= new Date(this.fechaInicio) && new Date(this.datosTickets[i].data) <= new Date(this.fechaFin)){
                                this.taula.push({
                                    "bezero_izena": this.datosTickets[i].bezero_izena,
                                    "data": this.datosTickets[i].data,
                                    "tratamendu_izena": this.datosTickets[i].tratamendu_izena,
                                    "prezioa": this.datosTickets[i].prezioa,
                                    "id": this.datosTickets[i].id
                                });
                            }
                        }else{
                            this.taula.push({
                                "bezero_izena": this.datosTickets[i].bezero_izena,
                                "data": this.datosTickets[i].data,
                                "tratamendu_izena": this.datosTickets[i].tratamendu_izena,
                                "prezioa": this.datosTickets[i].prezioa,
                                "id": this.datosTickets[i].id
                            });
                        }
                    }
                }
            }
        },

        fechaInicio: function(){
            this.bilatuData();
        },
        
        fechaFin: function(){
            this.bilatuData();
        }
    },
    mounted: function() {
        this.mostrarTickets();
        this.tratamenduakLortu();
    }
};
</script>

<template>
    <div class="contenido" id="orrialdea"></div>
    <div id="fondoOscuroLangile" class="fondo-oculto" @click="cerrarPopup"></div>
            <div class="containerPage">
                <!-- Izenaren arabera bilatzeko atala -->
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
                    </div>

                </div>

                <!-- Taula -->
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Tratamiento</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Fecha</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index" :id="dato.id">
                            <td @click="abrirPopup(index, dato.id)">{{dato.bezero_izena}}</td>
                            <td @click="abrirPopup(index, dato.id)">{{dato.tratamendu_izena}}</td>
                            <td @click="abrirPopup(index, dato.id)">{{dato.prezioa}}</td>
                            <td @click="abrirPopup(index, dato.id)">{{dato.data}}</td>
                            <td>
                                <i class="bi bi-trash-fill" @click="ezabatu(dato.id, index)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Editatzeko POPUP -->
            <div id="ventanaEmergenteTickets" class="ventana-oculta" style="width: 450px">
                <div class="contenido-ventana">
                    <div class="input-group-horarios">
                        <button type="button" id="cerrarVentanaLangile" class="btn x" @click="cerrarPopup()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="mt-5 text-start">
                        <label for="mensaje"><h2>Cliente</h2></label>
                    </div>
                    <div class="row d-flex mt-4">
                        <div class="col">
                            <input type="text" class="form-control" v-model="izena" style="background-color: white;" disabled>
                        </div>
                    </div>
                    <div class="mt-5 text-start">
                        <label for="mensaje"><h2>Tratamiento</h2></label>
                    </div>
                    <div class="mt-4">
                        <select class="form-select" style="min-width: 15vw;" v-model="tratamendu_izena">
                            <option selected disabled value="">Tratamientos</option>
                            <option v-for="tratamendus in tratamenduak" :value="tratamendus.izena" :key="tratamendus.izena">{{tratamendus.izena}}</option>
                        </select>
                    </div>
                    <div class="mt-5 text-start">
                        <label for="mensaje"><h2>Precio</h2></label>
                    </div>
                    <div class="mt-4">
                        <input type="text" class="form-control" v-model="prezioa" style="background-color: white;">
                    </div>
                    
                    <input id="submitLangile" type="submit" class="btn añadir btn-lg mt-4" value="Aceptar" @click="aldatuDatuak">
                </div>
            </div>
</template>
