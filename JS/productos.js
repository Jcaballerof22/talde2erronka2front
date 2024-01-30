var app = new Vue({
    el: '#app',
    data: {
        datosKategoria: [],
        datosProduk: [],
        datosEditatu: [],
        taula: [],
        bilatu:'',
        kategoriak:'all',
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
            this.datosProduk = data;
            // console.log(this.datosProduk);
            this.tituluAldatu();
            this.taula = this.datosProduk;
        });
        },

        kategoriakGet(){
            fetch('../../talde2erronka2back/Erronka2/public/api/kategoria', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.datosKategoria = data;
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
        },

        async ezabatu(id) {
            const js = JSON.stringify({"id": id}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/productos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        }
    },
    watch:{
        bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datosProduk;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].izena.startsWith(this.bilatu)){
                        this.taula.push(this.datosProduk[i]);
                    }
                }
            }
        },

        kategoriak: function(){
            if (this.kategoriak == 'all'){
                this.taula = this.datosProduk;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].id_kategoria == this.kategoriak){
                        this.taula.push(this.datosProduk[i]);
                    }
                }
            }
        },
    },
    mounted: function() {
        this.produktuakGet();
        this.kategoriakGet();
    }
});