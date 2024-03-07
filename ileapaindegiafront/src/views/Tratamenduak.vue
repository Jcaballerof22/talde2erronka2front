<template>
  
    <div>
    <div class="containerPage">
      <div class="input-group-estadisticas">
        <!-- Tabla para enseñar los datos -->
        <table id="tabla" class="table table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">Izena</th>
                    <th scope="col">Etxeko Prezioa €</th>
                    <th scope="col">Kanpoko Prezioa €</th>
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