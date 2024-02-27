<script>
import { ref } from "vue";
import taula from '../components/Taula.vue'
export default {
  components: {
    taula
  },
  data() {
    return {
      izena: "",
        etiketa: "",
        aldatu: '',
        bilatu: '',
        kodea: "",
        idlangile: "",
        idMaterial: "",
        datos: [],
        datosFiltrados: [],
        datosMaterialR: [],
        datosTalde : [],
        datosAlumnos : [],
        datosColorMaterialR: [],
        taula: [],
        resultadosCompletos: [],
        colorSeleccionado: null,
    };
  },
  methods: {
    alerta(color){
        alert(color)
    },
    async fetchData(){
      try {
      
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materialaN', {
            method: 'GET',
            mode: 'cors'
        });
      
        const data = await response.json();
      
        console.log(data);
      
        for (let i = 0; i < data.length; i++) {
            this.datos.push({
                "etiketa": data[i].etiketa,
                "izena": data[i].izena,
                "id": data[i].id,
                "id_langilea": data[i].id_langilea,
                "id_materiala": data[i].id_materiala,
                "amaiera_data": data[i].amaiera_data
            });
        }
      
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },

    filtrado(){
      var ida;
      var id_langileaa;
      var id_materialaa;
      var amaiera_dataa;
      var etiketaa;
      var izenaa;
      var repetido;
      var idsUsados = [];

      for (let i = 0; i < this.datos.length; i++) {

        repetido = false;
        ida = this.datos[i].id;
        id_langileaa = this.datos[i].id_langilea;
        id_materialaa = this.datos[i].id_materiala;
        amaiera_dataa = this.datos[i].amaiera_data;
        etiketaa = this.datos[i].etiketa;
        izenaa = this.datos[i].izena;

        for (let b = 0; b < idsUsados.length; b++) {
          if (idsUsados[b] == this.datos[i].id_materiala) {
            repetido = true;
          } else {

          }
        }

        if (repetido) {
          
        } else {
          this.datosFiltrados.push({
                "etiketa": etiketaa,
                "izena": izenaa,
                "id": ida,
                "id_langilea": id_langileaa,
                "id_materiala": id_materialaa,
                "amaiera_data": amaiera_dataa
          });
        }

        idsUsados.push(this.datos[i].id_materiala);

      }

      console.log(this.datosFiltrados);

    }
    
  },
  mounted: function() {
    this.fetchData();
    this.filtrado();
  }
  // Otro código de la vista
}
</script>
<template>
    <div class="containerPage">
        <div class="input-group-estadisticas">
                <div class="col">
                </div>
                <!-- Taula bat datuak erakusteko -->
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Etiqueta</th>
                            <th scope="col">Nombre</th>
                            <!-- Bi botoi libre edo okupatuta dauden materialak filtratzeko -->
                            <th scope="col" style="display: flex; justify-content: center;">
                                <button @click="alerta('rojo')" style="border-radius: 10%; background-color: #E26B6B;">Ocupado</button>
                                <button @click="alerta('verde')" style="border-radius: 10%; background-color: #CDDFA0;">Disponible</button>
                            </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Datuak v-for batekin erakusten dira, hauetan klikatzerakoan editatu ahal izateko edo erreserbatzeko funtzionalitatea emanda -->
                        <tr v-for="(dato, index) in datos" :key="index" :id="dato.id">
                          <!-- <td @click="abrirPopup(dato.etiketa, dato.izena, dato.id)">{{ dato.etiketa }}</td>
                          <td @click="abrirPopup(dato.etiketa, dato.izena, dato.id)" maxlength="100">{{ dato.izena }}</td> -->
                          <td style="display: flex; justify-content: center; width: 100%;">
                            <!-- "dato.amaiera_data" kontuan izanda item-aren kolorea aldatzen, bakoitzari funtzionalitate desberdina emanda -->
                            <i v-if="dato.amaiera_data == null" class="bi bi-square-fill" style="color: #E26B6B;" @click="abrirDevolverMaterial(dato.id)"></i>
                            <i v-else class="bi bi-square-fill" style="color: #CDDFA0;" @click="abrirReservar(dato.id)"></i>
                          </td>
                          <td>
                            <!-- Materiala ezabatzeko funztioari deitzen dion item-a -->
                            <i class="bi bi-trash-fill" @click="ezabatu(dato.id)"></i>
                          </td>
                        </tr>
                        <tr>
                            <td>aaaaaaa</td>
                            <td>
                                asasdad
                            </td>
                            <td>
                                asuidhiasudfh
                            </td>
                        </tr>
                      </tbody>  
                </table>

            </div>
    </div>
    
</template>