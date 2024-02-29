<script>
import taula from '../components/Taula.vue'
export default {
    components: {
        taula
    },
    data() {
        return {
            historialRoles: [],
            historialProductos: [],
            historialMaterial: [],
            tablas: ['tablaRoles', 'tablaProductos', 'tablaMaterial'],
            botonTabla: "",
            titulua: 'HISTORIAL'
        };
    },
    methods:{
        // Rolen datuak lortzeko metodoa (zein ikasle egon den rol bakoitzean eta zenbat aldiz)
        async tablaRoles() {
          try {
            const response = await fetch(window.ruta + `roles/historial`, { method: 'GET' });
        
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        
            const data = await response.json();
        
            for (let i = 0; i < data.length; i++) {
              this.historialRoles.push({
                "izena": data[i].izena + " " + data[i].abizenak,
                "mota": data[i].mota,
                "data": data[i].data
              });
            }
        
            this.tituluAldatu();
          } catch (error) {
            console.error('Error al obtener datos del servidor:', error);
          }
      },
      // Produktuen mugimenduen datuak lortzeko metodoa
      async tablaProductos() {
          try {
            const response = await fetch(window.ruta + `productos/mugimenduguztiak`, { method: 'GET' });
        
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        
            const data = await response.json();
        
            for (let i = 0; i < data.length; i++) {
              this.historialProductos.push({
                "produktua": data[i].produktu_izena,
                "izena": data[i].izena + " " + data[i].abizenak,
                "kopurua": data[i].kopurua,
                "marka": data[i].marka,
                "data": data[i].data
              });
            }
          } catch (error) {
            console.error('Error al obtener datos del servidor:', error);
          }
      },
      // Materialaren mugimenduen datuak lortzeko metodoa
      async tablaMaterial() {
          try {
            const response = await fetch(window.ruta + `materiala/mugimenduak`, { method: 'GET' });
        
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
        
            const data = await response.json();
        
            for (let i = 0; i < data.length; i++) {
              this.historialMaterial.push({
                "material": data[i].materiala,
                "izena": data[i].izena + " " + data[i].abizenak,
                "kopurua": data[i].kopurua,
                "hasiera_data": data[i].hasiera_data,
                "amaiera_data": data[i].amaiera_data
              });
            }
          } catch (error) {
            console.error('Error al obtener datos del servidor:', error);
          }
      },
      // Sakatzen den botoiaren arabera taula desberdinak bistaratzeko metodoa
      mostrarTablas(tabla){
          this.botonTabla = tabla;
          for (let i = 0; i < this.tablas.length; i++) {
              if(this.tablas[i]==tabla){
                  document.getElementById(tabla).style.display = 'table';
              }else{
                  document.getElementById(this.tablas[i]).style.display = 'none';
              }
          }
      },
      // Titulua aldatzeko metodoa
      tituluAldatu(){
          var scriptAnterior = document.getElementById("scriptDinamico");
          if (scriptAnterior) {
              scriptAnterior.remove();
          }
          var nuevoScript = document.createElement("script");
          nuevoScript.id = "scriptDinamico";
          nuevoScript.onload = function() {
              console.log("Script cargado exitosamente");
          };
          nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});";
          document.body.appendChild(nuevoScript);
      }
    },
    mounted: function(){
      this.tablaRoles();
      this.tablaProductos();
      this.tablaMaterial();
    }};
</script>

<template>
    <div class="contenido" id="orrialdea"></div>
        <div class="containerPage">
            <!-- Kategoriaren arabera sailkatzeko botoiak -->
            <div class="input-group-estadisticas">
                <div class="col">
                    <button type="button" class="btn añadir btn-lg" @click="mostrarTablas('tablaRoles')">Roles</button>
                    <button type="button" class="btn añadir btn-lg" @click="mostrarTablas('tablaProductos')">Productos</button>
                    <button type="button" class="btn añadir btn-lg" @click="mostrarTablas('tablaMaterial')">Material</button>
                </div>
                <!-- Dataren eta izenaren arabera sailkatzeko atala -->
                <div class="col">
                    <div class="input-group">
                        <div class="me-4">
                            <h4>De 
                            <input type="date" id="birthday" name="birthday">
                            a 
                            <input type="date" id="birthday" name="birthday">
                            </h4>
                        </div>
                        <input type="text" class="form-control buscar" placeholder="Buscar por nombre">
                        <div class="input-group-append">
                            <button class="btn lupa" type="button">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

<!-- //////////////////////////////////////////////////////////// Rolen taula //////////////////////////////////////////////////////////// -->
                
                <table id="tablaRoles" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in historialRoles" :key="index">
                            <td>{{ dato.izena }}</td>
                            <td v-if="dato.mota=='G'">Limpieza</td>
                            <td v-else>Mostrador</td>
                            <td>{{dato.data}}</td>
                        </tr>
                    </tbody>
                </table>

<!-- //////////////////////////////////////////////////////////// Produktuen taula //////////////////////////////////////////////////////////// -->

                <table id="tablaProductos" class="table table-hover table-striped" style="display: none;">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Fecha</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in historialProductos" :key="index">
                            <td>{{ dato.izena }}</td>
                            <td>{{ dato.produktua }} - {{dato.marka}}</td>
                            <td>{{dato.kopurua}}</td>
                            <td>{{dato.data}}</td>
                        </tr>
                    </tbody>
                </table>
                
<!-- //////////////////////////////////////////////////////////// Materialaren taula //////////////////////////////////////////////////////////// -->

                <table id="tablaMaterial" class="table table-hover table-striped" style="display: none;">
                    <thead>
                    <tr>
                        <th scope="col">Material</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha Inicio</th>
                        <th scope="col">Fecha Fin</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in historialMaterial" :key="index">
                            <td>{{ dato.material }}</td>
                            <td>{{ dato.izena }}</td>
                            <td>{{dato.hasiera_data}}</td>
                            <td>{{dato.amaiera_data}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
</template>