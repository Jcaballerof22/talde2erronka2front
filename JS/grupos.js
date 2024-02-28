var app = new Vue({
    el: '#app',
    data: {
        bilatu: '',
        izena: "",
        kodea: "",
        aldatu: '',
        datos: [],
        taula: [],
        titulua: 'GRUPOS',
    },
    methods: {
        async addDatuak() {
            if (this.izena === "") {
                alert("Falta el dato");
            } else {
                try {
                    const js = JSON.stringify({"izena": this.izena}); 
                    console.log("froga: " + js);

                    const response = await fetch(window.ruta + 'grupos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'no-cors'
                    });

                    const data = await response.text();
                    console.log(data);

                    this.datos.push({
                        "izena": this.izena,
                        "langileKop": "0",
                        "kodea": data
                    });
                } catch (error) {
                    console.error("Error al añadir el dato:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },

        abrirPopup(kodea, izena){
            this.aldatu = kodea;
            this.izena = izena;
            this.kodea = kodea;
            document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroGrupos').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        },

        async aldatuDatuak() {
            const js = JSON.stringify({"kodea": this.kodea, "izena": this.izena}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch(window.ruta + 'grupos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                for (let i = 0; i < this.datos.length; i++) {
                    if (this.datos[i].kodea === this.aldatu) {
                        this.datos[i].kodea = this.kodea;
                        this.datos[i].izena = this.izena;
                    }
                }
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        
        buscar(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        console.log(this.datos[i].izena + " " + this.datos[i].langileKop+ " " + this.datos[i].kodea)
                        this.taula.push({"izena" : this.datos[i].izena, "langileKop" : this.datos[i].langileKop,  "kodea" : this.datos[i].kodea});
                    }
                }
            }
        },

        async ezabatu(kodea) {
            const js = JSON.stringify({"kodea": kodea}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch(window.ruta + 'grupos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                this.taula = this.taula.filter(aux => aux.kodea !== kodea);
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        teclado(event){
            if(event.key == "Enter"){
                this.txertatuEdoAldatu();
            }
        },

        tituluAldatu(){
            var scriptAnterior = document.getElementById("scriptDinamico");
            if (scriptAnterior) {
                scriptAnterior.remove();
            }
            var nuevoScript = document.createElement("script");
            nuevoScript.id = "scriptDinamico";
            nuevoScript.onload = function() {
                console.log("Script cargado exitosamente");
            };
            nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});"; 
            document.body.appendChild(nuevoScript);
        },

        async lortuDatuak() {
            try {
                const response = await fetch(window.ruta + 'grupos', { 
                    method: 'GET',
                    mode: 'no-cors'
                });
                const data = await response.json();
                console.log(data); 
                for (let i = 0; i < data.length; i++) {
                    this.datos.push({
                        "izena": data[i].izena,
                        "langileKop": data[i].langileak,
                        "kodea": data[i].kodea
                    });
                }
                this.tituluAldatu();
            } catch (error) {
                console.error('Error al obtener los datos de los grupos:', error);
            }
        }
        

    },
    watch:{
        bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        console.log(this.datos[i].izena + " " + this.datos[i].langileKop+ " " + this.datos[i].kodea)
                        this.taula.push({"izena" : this.datos[i].izena, "langileKop" : this.datos[i].langileKop,  "kodea" : this.datos[i].kodea});
                    }
                }
            }
        }
    },
    mounted: function() {
        this.lortuDatuak()
        this.tituluAldatu();
        this.buscar();
      }
});

document.getElementById('cerrarVentanaGrupos').addEventListener('click', function() {
    ocultarVentana();
});

document.getElementById('fondoOscuroGrupos').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuroGrupos').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
}