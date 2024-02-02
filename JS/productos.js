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
        stock_alerta:'',
        titulua: 'PRODUCTOS'
    },

    methods:{
        async produktuakGet() {
            try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/productos', { method: 'GET' });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              const data = await response.json();
              this.datosProduk = data;
              this.tituluAldatu();
              this.taula = this.datosProduk;
            } catch (error) {
              console.error('Error fetching productos:', error);
            }
          },
        
        async kategoriakGet() {
            try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/kategoria', { method: 'GET' });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              const data = await response.json();
              console.log(data);
              this.datosKategoria = data;
              console.log(this.datosKategoria);
            } catch (error) {
              console.error('Error fetching categorias:', error);
            }
        },

        ocultarVentana() {
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'none';
        },
        abrirPopup(id){
            this.aldatu=id;
            this.id=id;
            if(id != ''){
                for(let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].id == id){
                        this.izena = this.datosProduk[i].izena;
                        this.marka = this.datosProduk[i].marka;
                        this.kategoria = this.datosProduk[i].id_kategoria;
                        this.deskribapena = this.datosProduk[i].deskribapena;
                        this.stock = this.datosProduk[i].stock;
                        this.stock_alerta = this.datosProduk[i].stock_alerta;
                        
                    }
                }
            }else{
                this.izena = '';
                this.marka = '';
                this.kategoria = '';
                this.deskribapena = '';
                this.stock = '';
                this.stock_alerta = '';
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
        },

        async addDatuak() {
            if (this.izena === "" || this.marka === "" || this.marka === "" || this.kategoria === "" || this.deskribapena === "" || this.stock === "" || this.stock_alerta === "") {
                alert("Faltan datos");
            } else {
                try {
                    const js = JSON.stringify({
                        "izena": this.izena,
                        "marka": this.marka,
                        "kategoria": this.kategoria,
                        "deskribapena": this.deskribapena,
                        "stock": this.stock,
                        "stock_alerta": this.stock_alerta
                    });

                    const response = await fetch('../../talde2erronka2back/Erronka2/public/api/productos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'no-cors'
                    });

                    const data = await response.text();

                    this.datosProduk.push({
                        "izena": this.izena,
                        "marka": this.marka,
                        "kategoria": this.kategoria,
                        "deskribapena": this.deskribapena,
                        "stock": this.stock,
                        "stock_alerta": this.stock_alerta,
                        "id": data
                    });

                } catch (error) {
                    console.error("Error al añadir datos:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'none';
        },

        async aldatuDatuak() {

            const js = JSON.stringify({
                "id": this.id,
                "izena": this.izena,
                "marka": this.marka,
                "kategoria": this.kategoria,
                "deskribapena": this.deskribapena,
                "stock": this.stock,
                "stock_alerta": this.stock_alerta
            }); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/productos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();

                for (let i = 0; i < this.datosProduk.length; i++) {
                    if (this.datosProduk[i].id == this.aldatu) {
                        this.datosProduk[i].izena = this.izena;
                        this.datosProduk[i].marka = this.marka;
                        this.datosProduk[i].kategoria = this.kategoria;
                        this.datosProduk[i].deskribapena = this.deskribapena;
                        this.datosProduk[i].stock = this.stock;
                        this.datosProduk[i].stock_alerta = this.stock_alerta;
                    }
                }
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },   
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