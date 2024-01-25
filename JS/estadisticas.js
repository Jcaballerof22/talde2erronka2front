var app = new Vue({
    el: '#app',
    data: {
        alumnos: ['Paco', 'Mikel', 'Ander', 'Izaskun', 'Asier', 'Sergio', 'Erik'],
        titulo2: "",
        myChart: null,
    },
    methods: {
        graficoRoles(){
            this.titulo2 = "ROLES";
            const data = {
                labels: this.alumnos,
                datasets: [
                    {
                        label: 'Limpieza',
                        data: [3, 7, 5, 10, 1, 6, 2],
                        borderColor: 'orange',
                        backgroundColor: 'rgba(233, 152, 87, 0.5)',
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    },
                    {
                        label: 'Recepción',
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
                labels: this.alumnos,
                datasets: [
                    {
                        label: 'Limpieza',
                        data: [0, 7, 5, 1, 3, 3, 4],
                        borderColor: 'orange',
                        backgroundColor: 'rgba(233, 152, 87, 0.5)',
                        borderWidth: 2,
                        borderRadius: Number.MAX_VALUE,
                        borderSkipped: false,
                    },
                    {
                        label: 'Recepción',
                        data: [2, 5, 8, 1, 2, 9, 1],
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
    },
    mounted: function(){
        this.graficoRoles();
    }
})


