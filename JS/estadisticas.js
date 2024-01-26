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
    },
    methods: {
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
        graficoMaterial(){
            this.titulo2 = "MATERIAL";
            const data = {
                labels: this.alumnos,
                datasets: [
                    {
                        label: 'Secador',
                        data: [3, 7, 5, 10, 1, 6, 2],
                        borderColor: 'orange',
                        backgroundColor: 'rgba(233, 152, 87, 0.5)',
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    },
                    {
                        label: 'Plancha',
                        data: [3, 5, 2, 5, 7, 9, 10],
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
        sacarGrupo(){
            return fetch('../../talde2erronka2back/Erronka2/public/api/horarios/taldea', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                    this.grupoHoy=data[0].izena;
            });
        },
        sacarAlumnos(){
            return fetch(`../../talde2erronka2back/Erronka2/public/api/roles/${this.grupoHoy}`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++){
                    this.alumnosNombre.push(data[i].izena + " " + data[i].abizenak);
                    this.alumnosL.push(data[i].suma_m);
                    this.alumnosM.push(data[i].suma_g);
                }
            });
        },
        sacarProductos(){
            fetch(`../../talde2erronka2back/Erronka2/public/api/productos/mugimendua`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++){
                    this.productosNombre.push(data[i].izena);
                    this.productosNumero.push(data[i].total_kopurua);
                }
            });
        }
    },
    mounted: function(){
        this.sacarGrupo().then(() => {
            this.sacarAlumnos().then(() => {
                this.graficoRoles();
            });
        });
        this.sacarProductos();
    }
})


