<script>    
  export default {
    data() {
        return {
            grupoHoy: "",
            titulo2: "",
            myChart: null,
            alumnosNombre: [],
            alumnosL: [],
            alumnosM: [],
            productosNombre: [],
            productosNumero: [],
            materialNombre: [],
            materialNumero: [],
            datosTalde: [],
            fechaInicio: "",
            fechaFin: ""
        };
    },
    methods: {
        esperar(grafiko){
            setTimeout(() => {
                this[grafiko]();
            }, 500); // Retraso de 1000 milisegundos
        },
        // Rolen grafikoa sortzeko metodoa
        graficoRoles(){
            this.titulo2 = "ROLES";
            const data = {
                labels: this.alumnosNombre,
                datasets: [
                    {
                        label: 'Limpieza',
                        data: this.alumnosL,
                        borderColor: 'rgb(0, 128, 128)',
                        backgroundColor: 'rgb(26, 183, 188, 0.5)',
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    },
                    {
                        label: 'Recepción',
                        data: this.alumnosM,
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
        graficoMaterial(){
            this.titulo2 = "MATERIAL";
            const data = {
                labels: this.materialNombre,
                datasets: [
                    {
                        label: 'Cantidad',
                        data: this.materialNumero,
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
        // Produktuen grafikoa sortzeko metodoa
        graficoProductos(){
            this.titulo2 = "PRODUCTOS";
            const data = {
                labels: this.productosNombre,
                datasets: [
                    {
                        label: 'Cantidad',
                        data: this.productosNumero,
                        borderColor: 'rgb(0, 128, 128)',
                        backgroundColor: 'rgb(26, 183, 188, 0.5)',
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
          
              if (data && data.length > 0) { // Verificar si hay datos antes de continuar
                for (let i = 0; i < data.length; i++) {
                    this.alumnosNombre.push(data[i].izena + " " + data[i].abizenak);
                    this.alumnosL.push(data[i].suma_m);
                    this.alumnosM.push(data[i].suma_g);
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
              const response = await fetch(window.ruta + `productos/mugimendua`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.productosNombre.push(data[i].izena);
                this.productosNumero.push(data[i].total_kopurua);
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
        }           
    },
    mounted: function(){
        this.sacarGrupo().then(() => {
            this.sacarAlumnos().then(() => {
                this.graficoRoles();
            });
        });
        this.sacarProductos();
        this.sacarMaterial();
        this.nombresGrupo();
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
                    <button type="button" class="btn añadir btn-lg" @click="esperar('graficoRoles')">Roles</button>
                    <button type="button" class="btn añadir btn-lg" @click="esperar('graficoProductos')">Productos</button>
                    <button type="button" class="btn añadir btn-lg" @click="esperar('graficoMaterial')">Material</button>
                    <!-- <select class="form-select combobox" aria-label="Default select example" v-model="grupoHoy" @change="sacarAlumnos">
                        <option v-for="talde in datosTalde" :value="talde.izena">{{ talde.izena }}</option>
                    </select> -->
                </div>
                <!-- Dataren eta izenaren arabera bilatzeko filtroak -->
                <div class="col">
                    <div class="input-group">
                        <div class="me-4">
                            <h4>De 
                            <input type="date" id="birthday" name="birthday" v-model="fechaInicio">
                            a 
                            <input type="date" id="birthday" name="birthday" v-model="fechaFin">
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
            </div>
        </div>
        <h2 class="text-center mb-3">{{titulo2}}</h2>

        <!-- Grafikoa hemen sartuko da -->
        <div class="d-flex align-items-center justify-content-center">
            <canvas id="grafikoa" style="max-width: 600px; max-height: 500px;"></canvas>
        </div>
</template>

