var app = new Vue({
    el: '#app',
    data: {
        historialRoles: [],
        historialProductos: [],
        historialMaterial: [],
        tablas: ['tablaRoles', 'tablaProductos', 'tablaMaterial'],
        botonTabla: ""
    },
    methods: {
        tablaRoles(){
            console.log("AAAAAAA");
            fetch(`../../talde2erronka2back/Erronka2/public/api/roles/historial`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++){
                    this.historialRoles.push({"izena" : data[i].izena + " " + data[i].abizenak, "mota" : data[i].mota, "data" : data[i].data});
                }
            });
        },
        tablaProductos(){
            fetch(`../../talde2erronka2back/Erronka2/public/api/productos/mugimenduguztiak`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++){
                    this.historialProductos.push({"produktua" : data[i].produktu_izena, "izena" : data[i].izena + " " + data[i].abizenak, "kopurua" : data[i].kopurua, "marka" : data[i].marka, "data" : data[i].data});
                }
            });
        },
        tablaMaterial(){
            fetch(`../../talde2erronka2back/Erronka2/public/api/materiala/mugimenduak`, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++){
                    this.historialMaterial.push({"material" : data[i].materiala, "izena" : data[i].izena + " " + data[i].abizenak, "kopurua" : data[i].kopurua, "hasiera_data" : data[i].hasiera_data, "amaiera_data" : data[i].amaiera_data});
                }
            });
        },
        mostrarTablas(tabla){
            this.botonTabla = tabla;
            for (let i = 0; i < this.tablas.length; i++) {
                if(this.tablas[i]==tabla){
                    document.getElementById(tabla).style.display = 'table';
                }else{
                    document.getElementById(this.tablas[i]).style.display = 'none';
                }
                
            }
        }
    },
    mounted: function(){
        this.tablaRoles();
        this.tablaProductos();
        this.tablaMaterial();
    }
});


