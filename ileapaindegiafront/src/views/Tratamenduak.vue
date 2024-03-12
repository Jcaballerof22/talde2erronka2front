<template>
  
    <div>
        <div id="fondoOscuroLangile" class="fondo-oculto"></div>

        <div id="ventanaEmergenteAñadirTratamiento" class="ventana-oculta">
            <div class="contenido-ventana">
                <!-- Boton para cerrar la ventana -->
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaAñadirTratamiento" class="btn x" @click="ocultarVentana()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <!-- Campo para meter la etiqueta -->
                <div class="mt-2">
                    <label for="mensaje" id="izenaTratamendua">Nombre</label>
                </div>
                <div class="mt-2">
                    <textarea id="modeloTextoMaterial" class="mt-2" name="mensaje" rows="1" cols="50" v-model="izena"
                    maxlength="10"></textarea>
                </div>
                <!-- Campo para meter el nombre -->
                <div class="mt-2">
                    <label for="mensaje" id="etxekoprezioaTratamenduak">Precio de Casa</label>
                </div>
                <div class="mt-2">
                    <input type="text" id="etxekoprezioNumber" class="mt-2" name="mensaje" v-model="etxekoprezioa"
                    oninput="this.value = this.value.replace(/[^0-9,.]/g, ''); if (this.value.split(',')[1]) { this.value = this.value.split(',')[0] + ',' + this.value.split(',')[1].substring(0, 2); }"
                     size="4">
                </div>
                <!-- Campo para meter el nombre -->
                <div class="mt-2">
                    <label for="mensaje" id="kanpokoprezioaTratamenduak">Precio de Fuera</label>
                </div>
                <div class="mt-2">
                    <input type="text" id="kanpokoprezioNumber" class="mt-2" name="mensaje" v-model="kanpokoprezioa"
                    oninput="this.value = this.value.replace(/[^0-9,.]/g, ''); if (this.value.split(',')[1]) { this.value = this.value.split(',')[0] + ',' + this.value.split(',')[1].substring(0, 2); }"
                     size="4">
                </div>
                <!-- Boton para llamar a la funcion que añada el  material -->
                <div class="mt-2">
                    <input id="submitAñadirMaterial" type="submit" class="btn añadir btn-lg mt-3"
                        @click="txertatuEdoAldatu" value="Enviar">
                </div>
            </div>
        </div>

        <div class="containerPage">
        <div class="input-group-estadisticas">
            <div class="col">
            <!-- Boton para añadir un nuevo materuak -->
            <button type="button" id="mostrarVentanaTratamiento" class="btn añadir btn-lg"
                @click="abrirPopup('' , '' , '')">Añadir tratamiento</button>
            </div>
            <!-- Tabla para enseñar los datos -->
            <table id="tabla" class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio de Casa €</th>
                        <th scope="col">Precio de Fuera €</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(dato, index) in datos" :key="index" :id="dato.id">
                    <!-- Si se clica encima de uno de los elementos, puedes editar los datos -->
                    <td>{{ dato.izena }}</td>
                    <td>{{ dato.etxeko_prezioa }}</td>
                    <td>{{ dato.kanpoko_prezioa }}</td>
                    <!-- La parte para saber si el material esta en uso o esta libre -->
                    <td>
                        <!-- Item para llamar a la funcion de borrado del elemento -->
                        <i class="bi bi-trash-fill" @click="ezabatu(dato.id)"></i>
                    </td>
                    </tr>
                </tbody>  
            </table>

        </div>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                id: "",
                izena: "",
                etxeko_prezioa: "",
                kanpoko_prezioa: "",
                aldatu: '',
                bilatu: '',
                datos: [],
                taula: [],
            };
        },
        methods: {

            abrirPopup(izena, etxeko_prezioa, kanpoko_prezioa, id){
                this.id = id;
                this.izena = izena;
                this.etxeko_prezioa = etxeko_prezioa;
                this.kanpoko_prezioa = kanpoko_prezioa;
                this.aldatu = id;
                document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
                document.getElementById('ventanaEmergenteAñadirTratamiento').style.display = 'block';
            },

            ocultarVentana(){
                document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
                document.getElementById('ventanaEmergenteAñadirTratamiento').style.display = 'none';
            },

            async fetchData(){
                try {
                    // el fetch que hace la llamada al back para recoger los datos, usando el metodo 'GET' y el modo 'cors'
                    const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/tratamenduak', {
                        method: 'GET',
                        mode: 'cors'
                    });
                
                    const data = await response.json();
                
                    this.datos = [];
                    // metemos los datos recogidos al array para despues poder filtrarlos
                    for (let i = 0; i < data.length; i++) {
                        this.datos.push({
                            "id": data[i].id,
                            "izena": data[i].izena,
                            "etxeko_prezioa": data[i].etxeko_prezioa,
                            "kanpoko_prezioa": data[i].kanpoko_prezioa
                        });
                    }
                    console.log(this.datos);
                } catch (error) {
                    console.error('Error al obtener los datos:', error);
                }
            },

            txertatuEdoAldatu(){
                if(this.aldatu != ''){
                    this.aldatuDatuak();
                }else{
                    this.addDatuak();
                }
                document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
                document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
            },

            async aldatuDatuak() {
                try {
                    var js = JSON.stringify({
                    "etiketa": this.etiketa,
                    "izena": this.izena,
                    "id": this.id_materiala
                    });
                    // el fetch que hara la llamada al back para cambiar los datos, metodo 'PUT' 
                    const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/editatu', {
                    method: 'PUT',
                    body: js
                    });
                    
                    const data = await response.text();
                    // se vuelve a llamar a la funcion que coje los datos del back al haber cambios en ellos
                    this.fetchData();
                    
                } catch (error) {
                    console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                }
            },

            async ezabatu(id) {
                try {

                    var js = JSON.stringify({"id": id}); 
                    // el fetch que hace la llamada al back para borrar el dato con el json que se le pasa, el metodo es 'PUT'
                    const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/tratamenduak/ezabatu', {
                    method: 'PUT',
                    body: js
                    });
                    
                    const data = await response.text();
                    // el filtrado de los datos para quitar el dato con el "id" que se acaba de borrar
                    this.datos = this.datos.filter(aux => aux.id !== id);

                } catch (error) {
                    console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                }
                // se vuelve a llamar a la funcion que coje los datos del back al haber cambios en ellos
                this.fetchData();
            },
        },
        mounted: function(){
            this.fetchData();
        }
        // watch:{

        // }
    }
</script>