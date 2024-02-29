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
        datosTodos: [],
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
      this.datosFiltrados = [];
      try {
      
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materialaN', {
            method: 'GET',
            mode: 'cors'
        });
      
        const data = await response.json();
      
        console.log(data);
        this.datos = [];
        for (let i = 0; i < data.length; i++) {
            this.datos.push({
                "etiketa": data[i].etiketa,
                "izena": data[i].izena,
                "ezabatze_data": data[i].ezabatze_data,
                "id": data[i].id,
                "id_langilea": data[i].id_langilea,
                "id_materiala": data[i].id_materiala,
                "amaiera_data": data[i].amaiera_data
            });
        }
        
        this.filtrado();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },

    filtrado(){
      var ida;
      var id_langileaa;
      var id_materialaa;
      var amaiera_dataa;
      var ezabatze_dataa;
      var etiketaa;
      var izenaa;
      var repetido;
      var idsUsados = [];

      console.log(JSON.parse(JSON.stringify(this.datos)));
      for (let i = 0; i < this.datos.length; i++) {

        repetido = false;
        ida = this.datos[i].id;
        id_langileaa = this.datos[i].id_langilea;
        id_materialaa = this.datos[i].id_materiala;
        amaiera_dataa = this.datos[i].amaiera_data;
        etiketaa = this.datos[i].etiketa;
        izenaa = this.datos[i].izena;
        ezabatze_dataa = this.datos[i].ezabatze_data;

        for (let b = 0; b < idsUsados.length; b++) {
          if (idsUsados[b] == this.datos[i].id_materiala) {
            repetido = true;
          } else {

          }
        }

        if (repetido) {
          
        } else {
          if (ezabatze_dataa != null) {
            
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
        }

        idsUsados.push(this.datos[i].id_materiala);

      }

      console.log(JSON.parse(JSON.stringify(this.datosFiltrados)));
      this.todosMaterial();
    },

    async todosMaterial(){
      this.datosTodos = [];
      console.log("Empieza el show");
      try {
      
      const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala', {
          method: 'GET',
          mode: 'cors'
      });
    
      const data = await response.json();
    
      console.log(data);
    
      for (let i = 0; i < data.length; i++) {
          this.datosTodos.push({
              "etiketa": data[i].etiketa,
              "izena": data[i].izena,
              "id": data[i].id
          });
      }
      
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }

      this.todosFiltrado();

    },

    todosFiltrado(){
      var exist = 0;

      for (let i = 0; i < this.datosTodos.length; i++) {
        for (let a = 0; a < this.datosFiltrados.length; a++) {
         
          if (this.datosTodos[i].etiketa == this.datosFiltrados[a].etiketa) {
            exist++;
          } 

        }

        if (exist == 0) {
          
          this.datosFiltrados.push({
                "etiketa": this.datosTodos[i].etiketa,
                "izena": this.datosTodos[i].izena,
                "id": "",
                "id_langilea": "",
                "id_materiala": this.datosTodos[i].id,
                "amaiera_data": ""
          });
          exist = 0;
        } else {
          exist = 0;
        }

      }

      console.log(this.datosFiltrados);
    },

    async ezabatu(id) {
      try {

        var js = JSON.stringify({"id": id}); 
        console.log("frogaBorrar: " + js);
          
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/ezabatu', {
          method: 'PUT',
          body: js
        });
          
        const data = await response.text();
        console.log(data);
        console.log(this.datos);

        this.datos = this.datos.filter(aux => aux.id !== id);
        console.log(this.datos);
      } catch (error) {
        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
      }
      
      this.fetchData();
    },
    
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
                        <tr v-for="(dato, index) in datosFiltrados" :key="index" :id="dato.id_materiala">
                          <td>{{ dato.etiketa }}</td>
                          <td maxlength="100">{{ dato.izena }}</td>
                          <td style="display: flex; justify-content: center; width: 100%;">
                            <!-- "dato.amaiera_data" kontuan izanda item-aren kolorea aldatzen, bakoitzari funtzionalitate desberdina emanda -->
                            <i v-if="dato.amaiera_data == null" class="bi bi-square-fill" style="color: #E26B6B;" @click="abrirDevolverMaterial(dato.id)"></i>
                            <i v-else class="bi bi-square-fill" style="color: #CDDFA0;" @click="abrirReservar(dato.id)"></i>
                          </td>
                          <td>
                            <!-- Materiala ezabatzeko funztioari deitzen dion item-a -->
                            <i class="bi bi-trash-fill" @click="ezabatu(dato.id_materiala)"></i>
                          </td>
                        </tr>
                      </tbody>  
                </table>

            </div>
    </div>
    
</template>