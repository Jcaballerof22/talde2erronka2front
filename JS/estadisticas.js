var app = new Vue({
    el: '#app',
    data: {
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
        fechaInicio: "",
        fechaFin: "",
        titulua: 'ESTADISTICAS'
    },
    methods: {
        // Rolen grafikoa sortzeko metodoa
        graficoRoles(){
            this.titulo2 = "ROLES";
            const data = {
                labels: this.alumnosNombre,
                datasets: [
                    {
                        label: 'Limpieza',
                        data: this.alumnosL,
                        borderColor: 'orange',
                        backgroundColor: 'rgba(233, 152, 87, 0.5)',
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
                        borderColor: 'orange',
                        backgroundColor: 'rgba(233, 152, 87, 0.5)',
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
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/horarios/taldea', { method: 'GET' });
          
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
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/roles/${this.grupoHoy}`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.alumnosNombre.push(data[i].izena + " " + data[i].abizenak);
                this.alumnosL.push(data[i].suma_m);
                this.alumnosM.push(data[i].suma_g);
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },          
        // Erabili diren produktuen datuak lortzeko metodoa
        async sacarProductos() {
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/productos/mugimendua`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.productosNombre.push(data[i].izena);
                this.productosNumero.push(data[i].total_kopurua);
              }
          
              this.tituluAldatu();
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },          
        // Erabili den materialaren datuak lortzeko metodoa
        async sacarMaterial() {
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/materiala/erabili`, { method: 'GET' });
          
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
        // Titulua aldatzeko metodoa
        tituluAldatu(){
            var scriptAnterior = document.getElementById("scriptDinamico");
            if (scriptAnterior) {
                scriptAnterior.remove();
            }
            // Crea un nuevo script y asigna su src según la opción seleccionada
            var nuevoScript = document.createElement("script");
            nuevoScript.id = "scriptDinamico";
            nuevoScript.onload = function() {
                console.log("Script cargado exitosamente");
            };
            nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});"; // Asigna el nombre del script según la opción
            // Agrega el nuevo script al cuerpo del documento
            document.body.appendChild(nuevoScript);
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
    }
})


