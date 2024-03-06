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
      this.taula = this.datosFiltrados;
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
  if (this.idlangile == "") {
    alert("Error, faltan datos");
  } else {
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
      // para editar el array tabla para filtrar por el color 
      taula() {
        if (this.colorSeleccionado === 'rojo') {
          return this.taula.filter(dato => dato.amaiera_data === null);
        } else if (this.colorSeleccionado === 'verde') {
          return this.taula.filter(dato => dato.amaiera_data !== null);
        } else {
          return this.taula;
        }
      }
    },

  watch: {
    bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datosFiltrados;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datosFiltrados.length; i++){
                    if(this.datosFiltrados[i].etiketa.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                        this.taula.push({"amaiera_data" : this.datosFiltrados[i].amaiera_data, "etiketa" : this.datosFiltrados[i].etiketa, "id" : this.datosFiltrados[i].id, "id_langilea" : this.datosFiltrados[i].id_langilea, "id_materiala" : this.datosFiltrados[i].id_materiala, "izena" : this.datosFiltrados[i].izena});
                    }
                }
            }
    }
  },
  // Otro código de la vista
}
</script>
<template>

  <!-- RESERVAR MATERIAL -->

  <div id="ventanaEmergenteReservarMaterial" class="ventana-oculta" style="padding: 1%; padding-right: 3%; border-radius: 15px;">
      <div class="contenido-ventana">
        <div class="row justify-content-end">
          <div class="margenAlBotonReservar col-1">
              <!-- Boton para cerrar el POPUP -->
              <button type="button" id="cerrarVentanaReservarMaterial" class="btn x" @click="ocultarVentanaR()">
                  <i class="bi bi-x"></i>
              </button>
          </div>
        </div>

        <div class="d-flex align-items-center mt-4">
          <!-- El ComboBox para elegir el grupo del alumno -->
          <select class="form-select combobox" id="selectorGruposMaterial" aria-label="Default select example" v-model="kodea" @change="nombresAlumnos()">  
            <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.kodea">{{ dato.izena }}</option>
          </select>
          <!-- ComboBox para elegir al alumno -->
          <select class="form-select combobox" id="selectorGruposMaterial" aria-label="Default select example" v-model="idlangile">
              <option   v-for="(dato,index) in datosAlumnos" :key="index" :value="dato.id">{{ dato.izena + " " + dato.abizenak }}</option>
              <option v-if="datosAlumnos.length === 0" disabled>Seleccione Grupo Primero</option>
          </select>
        </div>
          
        <div class="row justify-content-end">
          <!-- Boton para reservar -->
          <div class="mt-2" id="submitReservarMaterial">
              <input id="submitAñadirMaterial" type="submit" class="btn añadir btn-lg"
                  @click="reservarMaterial()" value="Reservar">
          </div>
        </div>
      </div>
  </div>

  <!-- DEVOLVER MATERIAL -->

  <div id="ventanaEmergenteDevolverMaterial" class="ventana-oculta" style="border-radius: 20px;">
      <div class="contenido-ventana">
          <div>
              <label for="mensaje" id="mensajeDevolverMaterial">El Material se ha devuelto?</label>
          </div>
          <!-- Botones para especificar si se ha devuelto o no el material -->
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
    <div class="contenido-ventana">
        <!-- Boton para cerrar la ventana -->
        <div class="input-group-horarios">
            <button type="button" id="cerrarVentanaAñadirMaterial" class="btn x" @click="ocultarVentana()">
                <i class="bi bi-x"></i>
            </button>
        </div>
        <!-- Campo para meter la etiqueta -->
        <div class="mt-2">
            <label for="mensaje" id="etiquetaLabelMaterial">Etiqueta</label>
        </div>
        <div class="mt-2">
            <textarea id="modeloTextoMaterial" class="mt-2" name="mensaje" rows="1" cols="50" v-model="etiketa"
                placeholder="Ingresa la etiqueta aquí" maxlength="10"></textarea>
        </div>
        <!-- Campo para meter el nombre -->
        <div class="mt-2">
            <label for="mensaje" id="nombreLabelMaterial">Nombre</label>
        </div>
        <div class="mt-2">
            <textarea id="marcaTextoMaterial" class="mt-2" name="mensaje" rows="1" cols="50" v-model="izena"
                placeholder="Ingresa el Nombre aquí"></textarea>
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
        <!-- Buscador por nombre -->
        <input type="text" class="form-control buscar" placeholder="Buscar por nombre" v-model="bilatu">
        <div class="col">
          <!-- Boton para añadir un nuevo materuak -->
          <button type="button" id="mostrarVentanaMaterial" class="btn añadir btn-lg"
            @click="abrirPopup('' , '' , '')">Añadir material</button>
        </div>
        <!-- Tabla para enseñar los datos -->
        <table id="tabla" class="table table-hover table-striped">
            <thead>
                <tr>
                    <th scope="col">Etiqueta</th>
                    <th scope="col">Nombre</th>
                    <!-- Dos botones para llamar a las funciones para filtrar los datos -->
                    <th scope="col" style="display: flex; justify-content: center;">
                        <button @click="ordenarPorColor('rojo')" style="border-radius: 10%; background-color: #E26B6B;">Ocupado</button>
                        <button @click="ordenarPorColor('verde')" style="border-radius: 10%; background-color: #CDDFA0;">Disponible</button>
                    </th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <!-- es un v-for que recorre el array "taula" donde estan los datos y los enseña-->
                <tr v-for="(dato, index) in taula" :key="index" :id="dato.id_materiala">
                  <!-- Si se clica encima de uno de los elementos, puedes editar los datos -->
                  <td @click="abrirPopup(dato.etiketa, dato.izena, dato.id_materiala)">{{ dato.etiketa }}</td>
                  <td @click="abrirPopup(dato.etiketa, dato.izena, dato.id_materiala)" maxlength="100">{{ dato.izena }}</td>
                  <!-- La parte para saber si el material esta en uso o esta libre -->
                  <td style="display: flex; justify-content: center; width: 100%;">
                    <!-- Si esta en rojo o esta en verde, se abrira una cosa u otra -->
                    <i v-if="dato.amaiera_data == null" class="bi bi-square-fill" style="color: #E26B6B;" @click="abrirDevolverMaterial(dato.id_materiala)"></i>
                    <i v-else class="bi bi-square-fill" style="color: #CDDFA0;" @click="abrirReservar(dato.id_materiala)"></i>
                  </td>
                  <td>
                    <!-- Item para llamar a la funcion de borrado del elemento -->
                    <i class="bi bi-trash-fill" @click="ezabatu(dato.id_materiala)"></i>
                  </td>
                </tr>
              </tbody>  
        </table>

      </div>
    </div>
    
</template>