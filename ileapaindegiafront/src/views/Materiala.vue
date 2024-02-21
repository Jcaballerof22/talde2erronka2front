<script>
import { ref } from "vue";
import taula from '../components/Taula.vue'
export default {
  components: {
    taula
  },
  data() {
    return {
      zutabeak: ["Diluc", "Jean", "Mona", "Keqing", "Zhongli"],
      lerroak:  [["Pyro", "Claymore"],["Anemo", "Espada"],["Hydro", "Catalizador"],["Electro", "Espada"],["Geo", "Polearm"]]
    };
  },
  methods: {
    alerta(color){
        alert(color)
    }
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
                        <tr v-for="(dato, index) in datosFiltrados" :key="index" :id="dato.id">
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