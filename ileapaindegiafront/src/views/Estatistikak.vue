<script>    
  import testua from "../assets/json/Estatistikak.json"

  export default {
    data() {
        return {
            grupoHoy: "",
            titulo2: "",
            myChart: null,
            alumnosNombre: [],
            alumnosL: [],
            alumnosM: [],
            alumnosFecha: [],
            nombreAlumnos: [],
            LAlumnos: [],
            MAlumnos: [],
            productosNombre: [],
            productosNumero: [],
            productosFecha: [],
            nombreProductos: [],
            numeroProductos: [],
            materialNombre: [],
            materialNumero: [],
            materialFecha: [],
            nombreMaterial: [],
            numeroMaterial: [],
            datosTalde: [],
            fechaInicio: "",
            fechaFin: "",
            hizkuntza: 'ESP',
            testua: testua,
            grafico: ""
        };
    },
    methods: {

        hizkuntzaLortu() {
            var value = sessionStorage.getItem('hizkuntza');
            return value !== null ? value : 'ESP';
        },

        esperar(grafiko){
            setTimeout(() => {
                this[grafiko]();
            }, 500); // Retraso de 1000 milisegundos
        },
        // Rolen grafikoa sortzeko metodoa
        graficoRoles() {
            this.titulo2 = testua[this.hizkuntza]['Roles'];
            this.grafico = "graficoRoles";

            // Limpiar los arrays antes de llenarlos nuevamente
            this.nombreAlumnos = [];
            this.LAlumnos = [];
            this.MAlumnos = [];

            // Usar un objeto para acumular los alumnos y sus roles
            const alumnosAcumulados = {};

            for (let i = 0; i < this.alumnosFecha.length; i++) {
                const fechaActual = new Date(this.alumnosFecha[i]);
                const fechaInicio = this.fechaInicio ? new Date(this.fechaInicio) : null;
                const fechaFin = this.fechaFin ? new Date(this.fechaFin) : null;

                // Filtrar según las fechas
                if ((fechaInicio && fechaActual < fechaInicio) || (fechaFin && fechaActual > fechaFin)) {
                    continue; // Saltar las fechas fuera del rango
                }

                // Acumular los alumnos por nombre
                const nombreAlumno = this.alumnosNombre[i];
                const cantidadL = parseFloat(this.alumnosL[i]);
                const cantidadM = parseFloat(this.alumnosM[i]);

                if (alumnosAcumulados[nombreAlumno]) {
                    alumnosAcumulados[nombreAlumno].cantidadL += cantidadL;
                    alumnosAcumulados[nombreAlumno].cantidadM += cantidadM;
                } else {
                    alumnosAcumulados[nombreAlumno] = { cantidadL: cantidadL, cantidadM: cantidadM };
                }
            }

            // Convertir el objeto acumulador en arrays para el gráfico
            for (const nombre in alumnosAcumulados) {
                if (alumnosAcumulados.hasOwnProperty(nombre)) {
                    this.nombreAlumnos.push(nombre);
                    this.LAlumnos.push(alumnosAcumulados[nombre].cantidadL);
                    this.MAlumnos.push(alumnosAcumulados[nombre].cantidadM);
                }
            }

            // Configuración del gráfico
            const data = {
                labels: this.nombreAlumnos,
                datasets: [
                    {
                        label: testua[this.hizkuntza]['Limpieza'],
                        data: this.LAlumnos,
                        borderColor: 'rgb(0, 128, 128)',
                        backgroundColor: 'rgb(26, 183, 188, 0.5)',
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    },
                    {
                        label: testua[this.hizkuntza]['Recepcion'],
                        data: this.MAlumnos,
                        borderColor: 'green',
                        backgroundColor: 'rgba(205, 223, 160, 0.5)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                },
            };

            const ctx = document.getElementById('grafikoa').getContext('2d');

            if (this.myChart) {
                this.myChart.destroy();
            }

            this.myChart = new Chart(ctx, config);
        },
        // Materialen grafikoa sortzeko metodoa
        graficoMaterial() {
            this.titulo2 = testua[this.hizkuntza]['Material'].toUpperCase();
            this.grafico = "graficoMaterial";

            // Limpiar los arrays antes de llenarlos nuevamente
            this.nombreMaterial = [];
            this.numeroMaterial = [];

            // Usar un objeto para acumular los materiales y sus cantidades
            const materialesAcumulados = {};

            for (let i = 0; i < this.materialFecha.length; i++) {
                const fechaActual = new Date(this.materialFecha[i]);
                const fechaInicio = this.fechaInicio ? new Date(this.fechaInicio) : null;
                const fechaFin = this.fechaFin ? new Date(this.fechaFin) : null;

                // Filtrar según las fechas
                if ((fechaInicio && fechaActual < fechaInicio) || (fechaFin && fechaActual > fechaFin)) {
                    continue; // Saltar las fechas fuera del rango
                }

                // Acumular los materiales por nombre
                const nombreMaterial = this.materialNombre[i];
                const numeroMaterial = parseFloat(this.materialNumero[i]);

                if (materialesAcumulados[nombreMaterial]) {
                    materialesAcumulados[nombreMaterial] += numeroMaterial;
                } else {
                    materialesAcumulados[nombreMaterial] = numeroMaterial;
                }
            }

            // Convertir el objeto acumulador en arrays para el gráfico
            for (const nombre in materialesAcumulados) {
                if (materialesAcumulados.hasOwnProperty(nombre)) {
                    this.nombreMaterial.push(nombre);
                    this.numeroMaterial.push(materialesAcumulados[nombre]);
                }
            }

            // Configuración del gráfico
            const data = {
                labels: this.nombreMaterial,
                datasets: [
                    {
                        label: testua[this.hizkuntza]['Cantidad'],
                        data: this.numeroMaterial,
                        borderColor: 'green',
                        backgroundColor: 'rgba(205, 223, 160, 0.5)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                },
            };

            const ctx = document.getElementById('grafikoa').getContext('2d');

            // Destruir el gráfico anterior si existe
            if (this.myChart) {
                this.myChart.destroy();
            }

            // Crear un nuevo gráfico
            this.myChart = new Chart(ctx, config);            
        },
        // Produktuen grafikoa sortzeko metodoa
        graficoProductos() {
            this.titulo2 = testua[this.hizkuntza]['Productos'];
            this.grafico = "graficoProductos";

            // Limpiar los arrays antes de llenarlos nuevamente
            this.nombreProductos = [];
            this.numeroProductos = [];

            // Usar un objeto para acumular los productos y sus cantidades
            const productosAcumulados = {};

            for (let i = 0; i < this.productosFecha.length; i++) {
                const fechaActual = new Date(this.productosFecha[i]);
                const fechaInicio = this.fechaInicio ? new Date(this.fechaInicio) : null;
                const fechaFin = this.fechaFin ? new Date(this.fechaFin) : null;

                // Filtrar según las fechas
                if ((fechaInicio && fechaActual < fechaInicio) || (fechaFin && fechaActual > fechaFin)) {
                    continue; // Saltar las fechas fuera del rango
                }

                // Acumular los productos por nombre
                const nombreProducto = this.productosNombre[i];
                const numeroProducto = parseFloat(this.productosNumero[i]);

                if (productosAcumulados[nombreProducto]) {
                    productosAcumulados[nombreProducto] += numeroProducto;
                } else {
                    productosAcumulados[nombreProducto] = numeroProducto;
                }
            }

            // Convertir el objeto acumulador en arrays para el gráfico
            for (const nombre in productosAcumulados) {
                if (productosAcumulados.hasOwnProperty(nombre)) {
                    this.nombreProductos.push(nombre);
                    this.numeroProductos.push(productosAcumulados[nombre]);
                }
            }


            // Configuración del gráfico
            const data = {
                labels: this.nombreProductos,
                datasets: [
                    {
                        label: testua[this.hizkuntza]['Cantidad'],
                        data: this.numeroProductos,
                        borderColor: 'rgb(0, 128, 128)',
                        backgroundColor: 'rgba(26, 183, 188, 0.5)',
                        borderWidth: 2,
                        borderRadius: 5,
                        borderSkipped: false,
                    }
                ]
            };
            
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                },
            };
            
            const ctx = document.getElementById('grafikoa').getContext('2d');
            
            // Destruir el gráfico anterior si existe
            if (this.myChart) {
                this.myChart.destroy();
            }

            // Crear un nuevo gráfico
            this.myChart = new Chart(ctx, config);            
        },
        // Gaur dagoen taldea lortzeko metodoa
        async sacarGrupo() {
            try {
              const response = await fetch(window.ruta + 'horarios/taldea', { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
              
              this.grupoHoy = data[0].izena;
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Talde baten ikasleak lortzeko metodoa
        async sacarAlumnos() {
            // this.alumnosNombre.splice(0, this.alumnosNombre.length);
            // this.alumnosL.splice(0, this.alumnosL.length);
            // this.alumnosM.splice(0, this.alumnosM.length);

            try {
              const response = await fetch(window.ruta + `roles/${this.grupoHoy}`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();

                this.alumnosNombre=[];
                this.alumnosL=[];
                this.alumnosM=[];
                this.alumnosFecha=[];
          
              if (data && data.length > 0) { // Verificar si hay datos antes de continuar
                for (let i = 0; i < data.length; i++) {
                    this.alumnosNombre.push(data[i].izena + " " + data[i].abizenak);
                    this.alumnosL.push(data[i].suma_m);
                    this.alumnosM.push(data[i].suma_g);
                    this.alumnosFecha.push(data[i].sortze_data);
                }

                // if (this.myChart) {
                //     this.myChart.destroy();
                // }
                
                // this.graficoRoles();
            } else {
                console.log('No se recibieron datos de alumnos.');
            }
            } catch (error) {
                console.error('Error al obtener datos del servidor:', error);
            }
        },          
        // Erabili diren produktuen datuak lortzeko metodoa
        async sacarProductos() {

            try {
              const response = await fetch(window.ruta + `productos/mugimendua`, { 
                method: 'GET'
            });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.productosNombre.push(data[i].izena);
                this.productosNumero.push(data[i].total_kopurua);
                this.productosFecha.push(data[i].data);
              }
          
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },     
        // Erabili den materialaren datuak lortzeko metodoa
        async sacarMaterial() {
            try {
              const response = await fetch(window.ruta + `materiala/erabili`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.materialNombre.push(data[i].izena + " " + data[i].etiketa);
                this.materialNumero.push(data[i].count_id);
                this.materialFecha.push(data[i].hasiera_data);
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },    
        async nombresGrupo() {            
            try {
                const response = await fetch(window.ruta + 'grupos', {
                    method: 'GET'
                });

                const data = await response.json();
                                
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
        abrirpdf(){
            window.open('http://localhost/talde2erronka2front/ileapaindegiafront/src/IMG/Manual%20de%20Usuario.pdf#page=12', '_blank');
        },
        prueba(){
            // this.grupoHoy = 'PEL2';
            this.sacarAlumnos().then(() => {
                this.graficoRoles();
            });
        }
    },
    mounted: function(){
        this.hizkuntza = this.hizkuntzaLortu()
        this.sacarGrupo().then(() => {
            this.sacarAlumnos().then(() => {
                this.graficoRoles();
            });
        });
        this.sacarProductos();
        this.sacarMaterial();
        this.nombresGrupo();
    },
    watch:{
        fechaInicio: function(){
            this.esperar(this.grafico);
        },

        fechaFin: function(){
            this.esperar(this.grafico);
        }
    }
}
</script>

<template>
    <!--  Menua linkatzeko         -->
    <div class="contenido" id="orrialdea"></div>
        <div class="containerPage">
            <!-- Kategoria desberdinen arabera sailkatzeko botoiak -->
            <div class="input-group-estadisticas">
                <div class="col">
                    <button type="button" class="btn añadir btn-lg" @click="esperar('graficoRoles')">{{testua[hizkuntza]?.['Roles']}}</button>
                    <button type="button" class="btn añadir btn-lg" @click="esperar('graficoProductos')">{{testua[hizkuntza]?.['Productos']}}</button>
                    <button type="button" class="btn añadir btn-lg" @click="esperar('graficoMaterial')">{{testua[hizkuntza]?.['Material']}}</button>
                    <select class=" combobox" id="selectorLangilea" aria-label="Default select example" v-model="grupoHoy" @change="prueba()">
                                <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.izena">{{ dato.izena }}</option>
                            </select>
                    <!-- <select class="form-select combobox" aria-label="Default select example" v-model="grupoHoy" @change="sacarAlumnos">
                        <option v-for="talde in datosTalde" :value="talde.izena">{{ talde.izena }}</option>
                    </select> -->
                </div>
                <!-- Dataren eta izenaren arabera bilatzeko filtroak -->
                <div class="col">
                    <div class="input-group">
                        <div class="row me-4">
                            <h4>
                            <input type="date" id="birthday" name="birthday" v-model="fechaInicio">
                            ⇨
                            <input type="date" id="birthday" name="birthday" v-model="fechaFin">
                            </h4>

                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="row">
                <button type="button" class="btn añadir btn-lg" @click="esperar('graficoRoles')">Roles</button>
            </div> -->
        </div>
        <h2 class="text-center mb-3">{{titulo2}}</h2>

        <!-- Grafikoa hemen sartuko da -->
        <div class="d-flex align-items-center justify-content-center">
            <canvas id="grafikoa" style="max-width: 600px; max-height: 500px;"></canvas>
        </div>
</template>

