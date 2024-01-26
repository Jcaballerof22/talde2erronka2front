var app = new Vue({
    el: '#app',
    data: {
        datosProduk : [],
        datosEditatu: [],
        titulua: 'PRODUCTOS'
    },

    methods:{
        produktuakGet(){
        fetch('../../talde2erronka2back/Erronka2/public/api/productos', { method: 'GET'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.length; i++) {
                this.datosProduk.push({"id" : data[i].id, "izena" : data[i].izena, "marka" : data[i].marka, "kategoria" : data[i].kategoria, "deskribapena" : data[i].deskribapena, "stock" : data[i].stock, "stock_alerta" : data[i].stock_alerta});
            }
            console.log(this.datosProduk);
            this.tituluAldatu();
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
                        this.datosEditatu.push({"id" : this.datosProduk[i].id, "izena" : this.datosProduk[i].izena, "marka" : this.datosProduk[i].marka, "kategoria" : this.datosProduk[i].kategoria, "deskribapena" : this.datosProduk[i].deskribapena, "stock" : this.datosProduk[i].stock, "stock_alerta" : this.datosProduk[i].stock_alerta});
                    }
                }
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
        
    }
});