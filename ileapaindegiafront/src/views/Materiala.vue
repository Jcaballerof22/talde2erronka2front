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

    abrirPopup(etiketa, izena, id){
      this.id_materiala = id;
      this.aldatu = id;
      this.etiketa = etiketa;
      this.izena = izena;
      document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
      document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'block';
    },

    abrirDevolverMaterial(id){
      this.idMaterial = id;
      document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
      document.getElementById('ventanaEmergenteDevolverMaterial').style.display = 'block';
    },

    abrirReservar(id){
      this.idMaterial = id;
      document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
      document.getElementById('ventanaEmergenteReservarMaterial').style.display = 'block';
    },

    ocultarVentana(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
    },

    ocultarVentanaR(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteReservarMaterial').style.display = 'none';
    },

    cerrarDevolver(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteDevolverMaterial').style.display = 'none';
    },

    cerrarVentanaX(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteReservarMaterial').style.display = 'none';
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
        console.log("froga: " + js);
          
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/editatu', {
          method: 'PUT',
          body: js
        });
          
        const data = await response.text();
          console.log(data);

        this.fetchData();
        
      } catch (error) {
        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
      }
    },

    addDatuak(){
      if(this.izena=="" && this.etiketa==""){
          alert("Datu falta dira")
      }else{
          var js = JSON.stringify({"izena": this.izena, "etiketa": this.etiketa}); 
          console.log("froga: "+js);
          fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/txertatu', {method: 'POST', body: js, mode: 'cors'})
          .then(function (response) {
                  return response.text();
          })
          .then(data=>{
              console.log(data);
          })
          .catch(error => {
              console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
          });
      }
      this.fetchData();
    },

    async fetchData(){

      this.datos = [],
      this.datosFiltrados = [],
      this.datosTodos = []

      try {
      
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materialaN', {
            method: 'GET',
            mode: 'cors'
        });
      
        const data = await response.json();
      
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


      // console.log(JSON.parse(JSON.stringify(this.datos)));
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

      // console.log(JSON.parse(JSON.stringify(this.datosFiltrados)));
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
      this.datosTodos = [];
      for (let i = 0; i < data.length; i++) {
          this.datosTodos.push({
              "etiketa": data[i].etiketa,
              "izena": data[i].izena,
              "id": data[i].id
          });
      }
      console.log(this.datosTodos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }

      this.todosFiltrado();

    },

    todosFiltrado(){
      var exist = 0;
      var fechaActual = new Date();
      var formato = fechaActual.getFullYear() + '-' + ('0' + (fechaActual.getMonth() + 1)).slice(-2) + '-' + ('0' + fechaActual.getDate()).slice(-2) + ' ' + ('0' + fechaActual.getHours()).slice(-2) + ':' + ('0' + fechaActual.getMinutes()).slice(-2) + ':' + ('0' + fechaActual.getSeconds()).slice(-2);


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
                "amaiera_data": formato
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

    ordenarPorColor(color) {
      this.colorSeleccionado = color;
    },

    async nombresGrupo() {
            
            try {
                const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/grupos', {
                    method: 'GET',
                    mode: 'cors'
                });

                const data = await response.json();
                
                console.log(data);
                
                data.forEach(grupo => {
                    this.datosTalde.push({
                        "izena": grupo.izena,
                        "kodea": grupo.kodea
                    });
                });
            } catch (error) {
                console.error('Error al obtener los nombres de grupo:', error);
            }
        },

        async nombresAlumnos(){

            try {
          
              const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/alumnos/'+this.kodea, {
                method: 'GET',
                mode: 'cors'
            });

              const data = await response.json();
              console.log(data);
              
              this.datosAlumnos.splice(0, this.datosAlumnos.length);

              data.forEach(alumno => {
                this.datosAlumnos.push({
                    "izena": alumno.izena,
                    "abizenak": alumno.abizenak,
                    "id": alumno.id
                });
            });
            } catch (error) {
              console.log(error);
            }
        },

async reservarMaterial(){
    try {
        var js = JSON.stringify({
          "id_materiala": this.idMaterial,
          "id_langilea": this.idlangile
        });
        console.log("froga: " + js);
            
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/reservar', {
          method: 'POST',
          body: js
        });
            
        const data = await response.text();
        console.log(data);
        this.cerrarVentanaX();
        this.fetchData();

      } catch (error) {
        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
      }
},

    async devolverMaterial(){
    try {
      var js = JSON.stringify({"id_materiala": this.idMaterial});
      console.log(js);
          
      const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/devolver', {
        method: 'PUT',
        body: js
      });
          
      const data = await response.text();
      console.log(data);

      this.cerrarDevolver();

      this.fetchData();
    } catch (error) {
      console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
    }
  },

  },
  
  mounted: function() {
    this.fetchData();
    this.nombresGrupo();
  },

  computed: {
      datosFiltrados() {
        if (this.colorSeleccionado === 'rojo') {
          return this.datosFiltrados.filter(dato => dato.amaiera_data === null);
        } else if (this.colorSeleccionado === 'verde') {
          return this.datosFiltrados.filter(dato => dato.amaiera_data !== null);
        } else {
          return this.datosFiltrados;
        }
      }
    },
  // Otro código de la vista
}
</script>
<template>

  <!-- RESERVAR MATERIAL -->

  <div id="ventanaEmergenteReservarMaterial" class="ventana-oculta" style="padding: 1%; padding-right: 6%;">
      <div class="contenido-ventana">
          <div class="margenAlBotonReservar" style="margin-right: -160%;">
              <button type="button" id="cerrarVentanaReservarMaterial" class="btn x" @click="ocultarVentanaR()">
                  <i class="bi bi-x"></i>
              </button>
          </div>
          <div class="d-flex align-items-center mt-4">
              <!-- Combobox bat taldeak erakusteko -->
              <select class="form-select combobox" id="selectorGruposMaterial" aria-label="Default select example" v-model="kodea" @change="nombresAlumnos()">
                  <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.kodea">{{ dato.izena }}</option>
              </select>
              <!-- Combobox bat ikasleak erakusteko -->
              <select class="form-select combobox" id="selectorGruposMaterial" aria-label="Default select example" v-model="idlangile">
                  <option   v-for="(dato,index) in datosAlumnos" :key="index" :value="dato.id">{{ dato.izena + " " + dato.abizenak }}</option>
                  <option v-if="datosAlumnos.length === 0" disabled>Seleccione Grupo Primero</option>
              </select>
          </div>
          <!-- Botoi bat reservarMaterial funtzioari deitzeko -->
          <div class="mt-2" id="submitReservarMaterial" style="margin-left: 90%;">
              <input id="submitAñadirMaterial" type="submit" class="btn añadir btn-lg"
                  @click="reservarMaterial()" value="Reservar">
          </div>
      </div>
  </div>

  <!-- DEVOLVER MATERIAL -->

  <div id="ventanaEmergenteDevolverMaterial" class="ventana-oculta">
      <div class="contenido-ventana">
          <div>
              <label for="mensaje" id="mensajeDevolverMaterial">El Material se ha devuelto?</label>
          </div>
          <div class="d-flex align-items-center mt-2" style="margin-left: 3%;">
              <input id="siDevolver" type="submit" class="btn añadir btn-lg mt-3"
                  @click="devolverMaterial()" value="Si">
              <input id="noDevolver" type="submit" class="btn añadir btn-lg mt-3"
                  @click="cerrarDevolver()" value="No">
          </div>
      </div>
  </div>

  <!-- AÑADIR MATERIAL -->

  <div id="fondoOscuroLangile" class="fondo-oculto"></div>
  <div id="ventanaEmergenteAñadirMaterial" class="ventana-oculta">
              <!-- Leiaren barruan egongo diren elementuak honen barruan daude -->
      <div class="contenido-ventana">
          <!-- POPUP-a ixteko botoia -->
          <div class="input-group-horarios">
              <button type="button" id="cerrarVentanaAñadirMaterial" class="btn x" @click="ocultarVentana()">
                  <i class="bi bi-x"></i>
              </button>
          </div>
          <!-- Etiqueta sarzteko kanpoa -->
          <div class="mt-2">
              <label for="mensaje" id="etiquetaLabelMaterial">Etiqueta</label>
          </div>
          <div class="mt-2">
              <textarea id="modeloTextoMaterial" class="mt-2" name="mensaje" rows="1" cols="50" v-model="etiketa"
                  placeholder="Ingresa la etiqueta aquí" maxlength="10"></textarea>
          </div>
          <!-- Izena sartzeko kanpoa -->
          <div class="mt-2">
              <label for="mensaje" id="nombreLabelMaterial">Nombre</label>
          </div>
          <div class="mt-2">
              <textarea id="marcaTextoMaterial" class="mt-2" name="mensaje" rows="1" cols="50" v-model="izena"
                  placeholder="Ingresa el Nombre aquí"></textarea>
          </div>
          <!-- Funtzioari deitzeko botoia eta datuak pasatzeko -->
          <div class="mt-2">
              <input id="submitAñadirMaterial" type="submit" class="btn añadir btn-lg mt-3"
                  @click="txertatuEdoAldatu" value="Enviar">
          </div>
      </div>
    </div>
    <div class="containerPage">
        <div class="input-group-estadisticas">
                <div class="col">
                  <button type="button" id="mostrarVentanaMaterial" class="btn añadir btn-lg"
                                @click="abrirPopup('' , '' , '')">Añadir material</button>
                </div>
                <!-- Taula bat datuak erakusteko -->
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Etiqueta</th>
                            <th scope="col">Nombre</th>
                            <!-- Bi botoi libre edo okupatuta dauden materialak filtratzeko -->
                            <th scope="col" style="display: flex; justify-content: center;">
                                <button @click="ordenarPorColor('rojo')" style="border-radius: 10%; background-color: #E26B6B;">Ocupado</button>
                                <button @click="ordenarPorColor('verde')" style="border-radius: 10%; background-color: #CDDFA0;">Disponible</button>
                            </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Datuak v-for batekin erakusten dira, hauetan klikatzerakoan editatu ahal izateko edo erreserbatzeko funtzionalitatea emanda -->
                        <tr v-for="(dato, index) in datosFiltrados" :key="index" :id="dato.id_materiala">
                          <td @click="abrirPopup(dato.etiketa, dato.izena, dato.id_materiala)">{{ dato.etiketa }}</td>
                          <td @click="abrirPopup(dato.etiketa, dato.izena, dato.id_materiala)" maxlength="100">{{ dato.izena }}</td>
                          <td style="display: flex; justify-content: center; width: 100%;">
                            <!-- "dato.amaiera_data" kontuan izanda item-aren kolorea aldatzen, bakoitzari funtzionalitate desberdina emanda -->
                            <i v-if="dato.amaiera_data == null" class="bi bi-square-fill" style="color: #E26B6B;" @click="abrirDevolverMaterial(dato.id_materiala)"></i>
                            <i v-else class="bi bi-square-fill" style="color: #CDDFA0;" @click="abrirReservar(dato.id_materiala)"></i>
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