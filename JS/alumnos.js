var app = new Vue({
    el: '#app',
    data: {
        izena: "",
        kodea: "",
        datos: [],
        datosTalde : [],
        abizenak: "",
        bilatu: '',
        aldatu: '',
        sailkatu: "all",
        taula: [],
        titulua: 'ALUMNOS',
    },
    methods: {
        async addDatuak() {
            if (this.abizenak === "" || this.izena === "") {
                alert("Faltan datos");
            } else {
                try {
                    const js = JSON.stringify({
                        "kodea": this.kodea,
                        "izena": this.izena,
                        "abizenak": this.abizenak
                    });
                    console.log("froga: " + js);

                    const response = await fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'no-cors'
                    });

                    const data = await response.text();
                    console.log(data);

                    this.datos.push({
                        "izena": this.izena,
                        "abizenak": this.abizenak,
                        "kodea": this.kodea,
                        "id": data
                    });
                } catch (error) {
                    console.error("Error al añadir datos:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },

        async nombresGrupo() {
            this.datosTalde.push({"izena": "All", "kodea": "all"});
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/grupos', {
                    method: 'GET'
                });

                const data = await response.json();
                
                console.log(data);
                
                data.forEach(grupo => {
                    this.datosTalde.push({
                        "izena": grupo.izena,
                        "kodea": grupo.kodea
                    });
                });
            } catch (error) {
                console.error('Error al obtener los nombres de grupo:', error);
            }
        },

        abrirPopup(kodea, izena, abizenak, id){
            //lodelPopup
            this.aldatu = id;
            this.izena = izena;
            this.abizenak = abizenak;
            this.kodea = kodea;
            this.id = id
             
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        },

        async aldatuDatuak() {
            const js = JSON.stringify({
                "kodea": this.kodea,
                "izena": this.izena,
                "id": this.id,
                "abizenak": this.abizenak
            }); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                for (let i = 0; i < this.datos.length; i++) {
                    if (this.datos[i].id == this.aldatu) {
                        this.datos[i].izena = this.izena;
                        this.datos[i].abizenak = this.abizenak;
                        this.datos[i].kodea = this.kodea;
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
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

        async ezabatu(id) {
            const js = JSON.stringify({"id": id}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                this.taula = this.taula.filter(aux => aux.id !== id);
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

        async datuakLortu() {
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/alumnos', {
                    method: 'GET',
                    mode: 'no-cors'
                });

                const data = await response.json();

                console.log(data);

                // Añadir los datos de los alumnos al arreglo datos
                data.forEach(alumno => {
                    this.datos.push({
                        "izena": alumno.izena,
                        "abizenak": alumno.abizenak,
                        "kodea": alumno.kodea,
                        "id": alumno.id
                    });
                });

                // Llamar a un método adicional después de obtener los datos
                this.tituluAldatu();
            } catch (error) {
                console.error('Error al obtener los alumnos:', error);
            }
        },

        

    },
    watch:{
        bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

        sailkatu: function(){
            if (this.sailkatu == 'all'){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].kodea == this.sailkatu){
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

    },
    mounted: function() {
        this.nombresGrupo()
        this.datuakLortu()
        this.tituluAldatu();
        this.buscar();
      }
});

document.getElementById('mostrarVentanaLangile').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'block';
});

document.getElementById('cerrarVentanaLangile').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'none';
});

document.getElementById('fondoOscuroLangile').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'none';
}

