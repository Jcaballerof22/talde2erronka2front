<template>
  
    <div>
        <!-- Fondo oscuro para los POPUPS -->
        <div id="fondoOscuroLangile" class="fondo-oculto"></div>

        <div id="ventanaEmergenteAñadirTratamiento" class="ventana-oculta">
            <div class="contenido-ventana">
                <!-- Boton para cerrar la ventana -->
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaAñadirTratamiento" class="btn x" @click="ocultarVentana()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <!-- Campo para meter el nombre -->
                <div class="mt-2">
                    <label for="mensaje" id="izenaTratamendua">Nombre</label>
                </div>
                <div class="mt-2">
                    <textarea id="modeloTextoMaterial" class="mt-2" name="mensaje" rows="1" cols="50" v-model="izena"
                    ></textarea>
                </div>
                <!-- Campo para meter el precio de casa -->
                <div class="mt-2">
                    <label for="mensaje" id="etxekoprezioaTratamenduak">Precio de Casa</label>
                </div>
                <div class="mt-2">
                    <input type="text" id="etxekoprezioNumber" class="mt-2" v-model="etxeko_prezioa"
                    oninput="this.value = this.value.replace(/[^0-9,.]/g, ''); if (this.value.split(',')[1]) { this.value = this.value.split(',')[0] + ',' + this.value.split(',')[1].substring(0, 2); }"
                     size="4">
                </div>
                <!-- Campo para meter el precio de fuera -->
                <div class="mt-2">
                    <label for="mensaje" id="kanpokoprezioaTratamenduak">Precio de Fuera</label>
                </div>
                <div class="mt-2">
                    <!-- Se fuerza a que solo se puedan meter numeros y luego se les pone con coma -->
                    <input type="text" id="kanpokoprezioNumber" class="mt-2" v-model="kanpoko_prezioa"
                    oninput="this.value = this.value.replace(/[^0-9,.]/g, ''); if (this.value.split(',')[1]) { this.value = this.value.split(',')[0] + ',' + this.value.split(',')[1].substring(0, 2); }"
                     size="4">
                </div>
                <!-- Boton para llamar a la funcion que añada el  tratamiento -->
                <div class="mt-2">
                    <input id="submitAñadirMaterial" type="submit" class="btn añadir btn-lg mt-3"
                        @click="txertatuEdoAldatu" value="Enviar">
                </div>
            </div>
        </div>

        <div class="containerPage">
        <div class="input-group-estadisticas">
            <div class="col">
            <!-- Boton para añadir un nuevo tratamiento -->
            <button type="button" id="mostrarVentanaTratamiento" class="btn añadir btn-lg" 
                @click="abrirPopup('' , '' , '', '')">Añadir tratamiento</button>
            </div>
            <!-- Tabla para enseñar los datos -->
            <table id="tabla" class="table table-hover table-striped">
                <thead>
                    <tr>
                        <!-- Las distintas columnas de la tabla -->
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio de Casa €</th>
                        <th scope="col">Precio de Fuera €</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    <!-- Se recorre el array de "datos" para enseñar los datos en la tabla -->
                    <tr v-for="(dato, index) in datos" :key="index" :id="dato.id">
                    <!-- Si se clica encima de uno de los elementos, puedes editar los datos -->
                    <td @click="abrirPopup(dato.izena, dato.etxeko_prezioa, dato.kanpoko_prezioa, dato.id)">{{ dato.izena }}</td>
                    <td @click="abrirPopup(dato.izena, dato.etxeko_prezioa, dato.kanpoko_prezioa, dato.id)">{{ dato.etxeko_prezioa }}</td>
                    <td @click="abrirPopup(dato.izena, dato.etxeko_prezioa, dato.kanpoko_prezioa, dato.id)">{{ dato.kanpoko_prezioa }}</td>
                    <!-- La parte para saber si el tratamiento esta en uso o esta libre -->
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
                // los distintos parametros que se usan
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
            // La funcion que abre el POPUP con los datos necesarios
            abrirPopup(izena, etxeko_prezioa, kanpoko_prezioa, id){
                this.id = id;
                this.izena = izena;
                this.etxeko_prezioa = etxeko_prezioa;
                this.kanpoko_prezioa = kanpoko_prezioa;
                this.aldatu = id;
                // Para ocultar el POPUP y e fondo oscuro
                document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
                document.getElementById('ventanaEmergenteAñadirTratamiento').style.display = 'block';
            },
            // Funcion que cierra el POPUP
            ocultarVentana(){
                document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
                document.getElementById('ventanaEmergenteAñadirTratamiento').style.display = 'none';
            },
            // Funcion que hace un fetch para recoger los datos y meterlos al array de "datos"
            async fetchData(){
                try {
                    // el fetch que hace la llamada al back para recoger los datos, usando el metodo 'GET' y el modo 'cors'
                    const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/tratamenduak', {
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
            // La funcion que filtra si se quiere añadir o editar un tratamiento
            txertatuEdoAldatu(){
                if(this.aldatu != ''){
                    this.aldatuDatuak();
                }else{
                    this.addDatuak();
                }
                // Se cierra el POPUP y se vuelve a llamar al back
                document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
                document.getElementById('ventanaEmergenteAñadirTratamiento').style.display = 'none';
                this.fetchData();
            },
            // Funcion para cambiar los datos en le back
            async aldatuDatuak() {
                try {
                    var js = JSON.stringify({
                    "id": this.id,
                    "izena": this.izena,
                    "etxeko_prezioa": this.etxeko_prezioa,
                    "kanpoko_prezioa": this.kanpoko_prezioa
                    });
                    // el fetch que hara la llamada al back para cambiar los datos, metodo 'PUT' 
                    const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/tratamenduak/editatu', {
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
            // Funcion que añade datos en el back
            addDatuak(){
                // se comprueba si hay datos, si faltan salta una alerta
                if(this.izena=="" && this.etxeko_prezioa=="" && this.kanpoko_prezioa==""){
                    alert("Datu falta dira")
                }else{
                    var js = JSON.stringify({"izena": this.izena, "etxeko_prezioa": this.etxeko_prezioa, "kanpoko_prezioa": this.kanpoko_prezioa}); 
                    // el fetch que hace la llamda al back para sumar datos, con metodo 'POST', y json y modo 'cors'
                    fetch('http://localhost/talde2erronka2back/Erronka2/public/api/tratamenduak/txertatu', {method: 'POST', body: js, mode: 'cors'})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                    })
                    .catch(error => {
                        // por si hay algun error por los constraints
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da txertatu" + error);
                    });
                }
                // Se vuelve a llamar al back para recoger los datos cambiados
                this.fetchData();
            },

            async ezabatu(id) {
                try {

                    var js = JSON.stringify({"id": id}); 
                    // el fetch que hace la llamada al back para borrar el dato con el json que se le pasa, el metodo es 'PUT'
                    const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/tratamenduak/ezabatu', {
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
        // Para iniciar recogiendo los datos
        mounted: function(){
            this.fetchData();
        }
    }
</script>