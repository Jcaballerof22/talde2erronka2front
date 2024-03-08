<script>
export default {
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
        taula: [],
        colorSeleccionado: null,
    };
  },
  methods: {
    // funcion para abrir el POPUP para añadir material
    abrirPopup(etiketa, izena, id){
      this.id_materiala = id;
      this.aldatu = id;
      this.etiketa = etiketa;
      this.izena = izena;
      document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
      document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'block';
    },
    // funcion para abrir el POPUP para devolver el material
    abrirDevolverMaterial(id){
      this.idMaterial = id;
      document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
      document.getElementById('ventanaEmergenteDevolverMaterial').style.display = 'block';
    },
    // funcion para abrir el POPUP para reservar el material
    abrirReservar(id){
      this.idMaterial = id;
      document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
      document.getElementById('ventanaEmergenteReservarMaterial').style.display = 'block';
    },
    // funcion para ocultar el POPUP de añadir el material
    ocultarVentana(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
    },
    // funcion para cerrar el POPUP de reservar material
    ocultarVentanaR(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteReservarMaterial').style.display = 'none';
    },
    // funcion para cerrar el POPUP para devolver el material
    cerrarDevolver(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteDevolverMaterial').style.display = 'none';
    },
    // funcion para cerrar el POPUP para reservar el material
    cerrarVentanaX(){
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteReservarMaterial').style.display = 'none';
    },
    // funcion para saber si se quiere cambiar los datos o sumarlos
    txertatuEdoAldatu(){
      if(this.aldatu != ''){
        this.aldatuDatuak();
      }else{
        this.addDatuak();
      }
      document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
      document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
    },
    // la funcion para cambiar los datos, se manda un json con los datos que se quieran cambiar
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
    // la funcion para sumar datos nuevos
    addDatuak(){
      // se comprueba si hay datos, si faltan salta una alerta
      if(this.izena=="" && this.etiketa==""){
          alert("Datu falta dira")
      }else{
          var js = JSON.stringify({"izena": this.izena, "etiketa": this.etiketa}); 
          // el fetch que hace la llamda al back para sumar datos, con metodo 'POST', y json y modo 'cors'
          fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/txertatu', {method: 'POST', body: js, mode: 'cors'})
          .then(function (response) {
                  return response.text();
          })
          .then(data=>{
              console.log(data);
          })
          .catch(error => {
              // por si hay algun error por los constraints
              console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
          });
      }
      // se llama a la siguiente funcion que filtrara los datos recogidos
      this.fetchData();
    },
    // la funcion que llama al back para coger todos los datos sobre los materiales y de la tabla "materiala_erabili"
    async fetchData(){
      // vaciamos los arrays antes de empezar
      this.datos = [],
      this.datosFiltrados = [],
      this.datosTodos = []

      try {
        // el fetch que hace la llamada al back para recoger los datos, usando el metodo 'GET' y el modo 'cors'
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materialaN', {
            method: 'GET',
            mode: 'cors'
        });
      
        const data = await response.json();
      
        this.datos = [];
        // metemos los datos recogidos al array para despues poder filtrarlos
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
        // llamamos a la funcion que empezara con el filtro de los datos
        this.filtrado();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    // funcion para filtrar todos los datos que se recogen para saber si estan repetidos o no, y si estan borrados o no por el borrado logico que se usa
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
      // se recorre el array con los datos y se meten en las variables
      for (let i = 0; i < this.datos.length; i++) {

        repetido = false;
        ida = this.datos[i].id;
        id_langileaa = this.datos[i].id_langilea;
        id_materialaa = this.datos[i].id_materiala;
        amaiera_dataa = this.datos[i].amaiera_data;
        etiketaa = this.datos[i].etiketa;
        izenaa = this.datos[i].izena;
        ezabatze_dataa = this.datos[i].ezabatze_data;
        // se comprueba si el "id" esta repetido o no
        for (let b = 0; b < idsUsados.length; b++) {
          if (idsUsados[b] == this.datos[i].id_materiala) {
            repetido = true;
          } else {

          }
        }
        // si esta repetido, no se mete al array de datos
        if (repetido) {
          
        } else {
          // si el dato no esta repetido, se comprueba si esta borrado o no
          if (ezabatze_dataa != null) {
            
          } else {
          // si todo esta en orden, se meten los datos al array que se usara mas adelante
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
        // se meten los datos dentro del array de "id"-s usados para no repetirlos
        idsUsados.push(this.datos[i].id_materiala);

      }

      this.todosMaterial();
    },
    // la funcion que llama al back para coger todos los datos sobre todos los materiales
    async todosMaterial(){
      // se vacia el array "datosTodos"
      this.datosTodos = [];
      try {
      // el fetch que hace la llamda al back para coger los datos, con metodo 'GET' y modo 'cors'
      const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala', {
          method: 'GET',
          mode: 'cors'
      });
    
      const data = await response.json();
      // se vuelve a vaciar el array "datosTodos"
      this.datosTodos = [];
      // metemos los datos recogidos por el fetch al array
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
      // se llama a la siguiente funcion que filtrara los datos recogidos
      this.todosFiltrado();

    },
    // la funcion que filtra los datos y compara si falta algun dato que no haya tenido ningun registro previo de reserva
    todosFiltrado(){
      var exist = 0;
      // el dato del la hora y dia en el que se ejecuta con su formato
      var fechaActual = new Date();
      var formato = fechaActual.getFullYear() + '-' + ('0' + (fechaActual.getMonth() + 1)).slice(-2) + '-' + ('0' + fechaActual.getDate()).slice(-2) + ' ' + ('0' + fechaActual.getHours()).slice(-2) + ':' + ('0' + fechaActual.getMinutes()).slice(-2) + ':' + ('0' + fechaActual.getSeconds()).slice(-2);

      // se recorre el array de datos y se compara 
      for (let i = 0; i < this.datosTodos.length; i++) {
        for (let a = 0; a < this.datosFiltrados.length; a++) {
          // si existe el dato, se suma 1 a la variable "exist"
          if (this.datosTodos[i].etiketa == this.datosFiltrados[a].etiketa) {
            exist++;
          } 

        }
        // si la variable "exist" es 0, metemos datos nuevos al array
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
      // e se iguala el array al array que se usara para enseñar datos en la tabla
      this.taula = this.datosFiltrados;
    },
    // la funcion que hace la llamada al back para borrar un dato, se le pasa el "id"
    async ezabatu(id) {
      try {

        var js = JSON.stringify({"id": id}); 
        // el fetch que hace la llamada al back para borrar el dato con el json que se le pasa, el metodo es 'PUT'
        const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/ezabatu', {
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
    // la funcion que mete el dato del color del que se quiere filtrar en "colorSeleccionado"
    ordenarPorColor(color) {
      this.colorSeleccionado = color;
    },
    // la funcion que hace la llamada al back para coger los datos de los grupos
    async nombresGrupo() {
      try {
          // el fetch que hace la llamda al back, se usa el metodo 'GET' y el modo 'cors'
          const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/grupos', {
              method: 'GET',
              mode: 'cors'
          });

          const data = await response.json();
          // se meten los datos dentro del array "datosTalde"
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
    // la funcion que hace la llamda al back para sacar los datos de los alumnos
    async nombresAlumnos(){

        try {
          // el fetch que hace la llamada al back, se usa el metodo 'GET' y el modo 'cors', aparte se manda el codigo del grupo para filtrar los datos
          const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/alumnos/'+this.kodea, {
            method: 'GET',
            mode: 'cors'
        });

          const data = await response.json();
          // se vacia el array de datos para no sobreescribirlos
          this.datosAlumnos.splice(0, this.datosAlumnos.length);
          // se meten los datos al array "datosAlumnos"
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
    // funcion que manda un json al back para la funcionalidad de reservar un material, donde se mandan "id_materiala" e "id_langilea" como datos
    async reservarMaterial(){
      // si faltan datos al hacer la llamada a la funcion, saltara la alerta
      if (this.idlangile == "") {
        alert("Error, faltan datos");
      } else {
        // en el caso de tener los datos, se hara una llamada al back mandando el json con los datos
        try {
            var js = JSON.stringify({
              "id_materiala": this.idMaterial,
              "id_langilea": this.idlangile
            });
            // el fetch que manda los datos al back con su ruta, el metodo utilizado es el 'POST'
            const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/reservar', {
              method: 'POST',
              body: js
            });
                
            const data = await response.text();
            // llamada a la funcion que cierra el POPUP
            this.cerrarVentanaX();
            // se vuelve a llamar a la funcion que coje los datos del back al haber cambios en ellos
            this.fetchData();

          } catch (error) {
            console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
          }
      }
    },

    // funcion que manda un json con el "id_materuala" para editarlo en el back, en este caso para hacer su funcionalidad de devolver
    async devolverMaterial(){
    try {
      var js = JSON.stringify({"id_materiala": this.idMaterial});
          
      // el fetch que manda el json al back con su ruta, el metodo utilizado es el 'PUT'
      const response = await fetch('http://localhost/Erronka2/talde2erronka2back/Erronka2/public/api/materiala/devolver', {
        method: 'PUT',
        body: js
      });
          
      const data = await response.text();
      // llamada a la funcion que cierra el POPUP
      this.cerrarDevolver();
      // se vuelve a llamar a la funcion que coje los datos del back al haber cambios en ellos
      this.fetchData();
    } catch (error) {
      console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
    }
  },

  },
  
  mounted: function() {
    // funciones que se llaman al entrar en la pagina
    this.fetchData();
    this.nombresGrupo();
  },

  computed: {
      // para editar el array tabla, para filtrar por el color 
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
    // funcion que siempre esta al tanto de si se escribe en el campo de busqueda para filtrar los datos
    bilatu: function(){
            // si no hay nada escrito, iguala los datos a los que se van a enseñar en la tabla
            if (this.bilatu == ''){
                this.taula = this.datosFiltrados;
            }else{
                // si se escribe, compara los datos y los filtra
                this.taula = [];
                for (let i = 0; i < this.datosFiltrados.length; i++){
                    if(this.datosFiltrados[i].etiketa.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                        this.taula.push({"amaiera_data" : this.datosFiltrados[i].amaiera_data, "etiketa" : this.datosFiltrados[i].etiketa, "id" : this.datosFiltrados[i].id, "id_langilea" : this.datosFiltrados[i].id_langilea, "id_materiala" : this.datosFiltrados[i].id_materiala, "izena" : this.datosFiltrados[i].izena});
                    }
                }
            }
    }
  },

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
          <!-- Boton para llamar a la funcion para reservar -->
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
        <!-- Buscador por etiqueta -->
        <input type="text" class="form-control buscar" placeholder="Buscar por etiqueta" v-model="bilatu">
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