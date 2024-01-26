var app = new Vue({
    el: '#app',
    data: {
        datosKategoria: [],
        datosProduk: [],
        datosEditatu: [],
        id:'',
        izena:'',
        marka:'',
        kategoria:'',
        deskribapena:'',
        stock:'',
        titulua: 'PRODUCTOS'
    },

    methods:{
        produktuakGet(){
        fetch('../../talde2erronka2back/Erronka2/public/api/productos', { method: 'GET'})
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.length; i++) {
                this.datosProduk.push({"id" : data[i].id, "izena" : data[i].izena, "marka" : data[i].marka, "kategoria" : data[i].kategoria, "deskribapena" : data[i].deskribapena, "stock" : data[i].stock, "stock_alerta" : data[i].stock_alerta});
            }
            // console.log(this.datosProduk);
            this.tituluAldatu();
        });
        },

        kategoriakGet(){
            fetch('../../talde2erronka2back/Erronka2/public/api/kategoria', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                for(let i = 0; i < data.length; i++) {
                    this.datosKategoria.push({"izena" : data[i].izena});
                }
                console.log(this.datosKategoria);
            });
        },

        ocultarVentana() {
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'none';
        },
        abrirPopup(id){
            if(id != ''){
                for(let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].id == id){
                        this.izena = this.datosProduk[i].izena;
                        this.marka = this.datosProduk[i].marka;
                        this.kategoria = this.datosProduk[i].kategoria;
                        this.deskribapena = this.datosProduk[i].deskribapena;
                        this.stock = this.datosProduk[i].stock;
                    }
                }
            }else{
                this.izena = '';
                this.marka = '';
                this.kategoria = '';
                this.deskribapena = '';
                this.stock = '';
            }
            
            document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'block';
        },

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
    mounted: function() {
        this.produktuakGet();
        this.kategoriakGet();
    }
});