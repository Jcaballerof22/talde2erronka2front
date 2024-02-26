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
        console.log('La instancia Vue se ha montado en el DOM.');
      
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala', {
            method: 'GET',
            mode: 'cors'
        });
      
        const data = await response.json();
      
        console.log(data);
      
        for (let i = 0; i < data.length; i++) {
            console.log("Entraaaa ");
            var datosColorMaterialR = this.segundaLlamada(data[i].id);
      
            this.datos.push({
                "etiketa": data[i].etiketa,
                "izena": data[i].izena,
                "id": data[i].id,
                "id_langilea": datosColorMaterialR[0].id_langilea,
                "amaiera_data": datosColorMaterialR[0].amaiera_data
            });
        }
      
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
    
  },
  async segundaLlamada(id){
    try {
          
      const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materialaF/' + id, {
        method: 'GET',
        mode: 'cors'
    });

      const datosColorMaterialR = await response.json();
      console.log(datosColorMaterialR);
      return datosColorMaterialR;
            
    } catch (error) {
      console.log(error);
    }
  },
  mounted: function() {
    this.fetchData();
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