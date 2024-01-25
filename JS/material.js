var pinga = new Vue({
    el: '#pinga',
    data: {
        // bilatu: '',
        izena: "",
        etiketa: "",
        aldatu: '',
        datos: [],
        taula: [],
        titulua: 'MATERIAL',
    },
    methods: {
        addDatuak(){
            //
                if(this.izena=="" && this.etiketa==""){
                    alert("Datu falta dira")
                }else{
                    var js = JSON.stringify({"izena": this.izena, "etiketa": this.etiketa}); 
                    console.log("froga: "+js);
                    fetch('../../talde2erronka2back/Erronka2/public/api/materiala/txertatu', {method: 'POST', body: js, mode: 'no-cors'})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.datos.push({"etiketa" : this.etiketa, "izena" : this.izena, "kodea" : data});
                        
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
                }
        },
        abrirPopup(etiketa, izena, id){
            

            this.aldatu = id;
            this.etiketa = etiketa;
            this.izena = izena;
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                //  
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
        },

        // aldatuDatuak(){
        //     var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena}); 
        //     console.log("froga: "+js);
        //     fetch('../../talde2erronka2back/Erronka2/public/api/grupos/editatu', {method: 'PUT', body: js})
        //             .then(function (response) {
        //                     return response.text();
        //             })
        //             .then(data=>{
        //                 console.log(data);
        //                 for (let i = 0; i < this.datos.length; i++) {
        //                     if (this.datos[i].kodea == this.aldatu){
        //                         this.datos[i].kodea = this.kodea;
        //                         this.datos[i].izena = this.izena;
        //                     }
        //                 }
        //             })
        //             .catch(error => {
        //                 console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        //             });
        // },
        
        // buscar(){
        //     if (this.bilatu == ''){
        //         this.taula = this.datos;
        //     }else{
        //         this.taula = [];
        //         for (let i = 0; i < this.datos.length; i++){
        //             if(this.datos[i].izena.startsWith(this.bilatu)){
        //                 console.log(this.datos[i].izena + " " + this.datos[i].langileKop+ " " + this.datos[i].kodea)
        //                 this.taula.push({"izena" : this.datos[i].izena, "langileKop" : this.datos[i].langileKop,  "kodea" : this.datos[i].kodea});
        //             }
        //         }
        //     }
        // },

        ezabatu(id){
            var js = JSON.stringify({"id": id}); 
            console.log("frogaBorrar: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/materiala/ezabatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
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
    },
    // watch:{
    //     bilatu: function(){
    //         if (this.bilatu == ''){
    //             this.taula = this.datos;
    //         }else{
    //             this.taula = [];
    //             for (let i = 0; i < this.datos.length; i++){
    //                 if(this.datos[i].izena.startsWith(this.bilatu)){
    //                     console.log(this.datos[i].izena + " " + this.datos[i].langileKop+ " " + this.datos[i].kodea)
    //                     this.taula.push({"izena" : this.datos[i].izena, "langileKop" : this.datos[i].langileKop,  "kodea" : this.datos[i].kodea});
    //                 }
    //             }
    //         }
    //     }
    // },
    mounted: function() {
        // Código que se ejecuta cuando la instancia Vue se ha montado en el DOM
        console.log('La instancia Vue se ha montado en el DOM.');
        // Puedes realizar operaciones adicionales aquí
        fetch('../../talde2erronka2back/Erronka2/public/api/materiala', { method: 'GET', mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            for (let i = 0; i < data.length; i++) {
                // Obtén la referencia de la tabla por su id
                this.datos.push({"etiketa" : data[i].etiketa, "izena" : data[i].izena, "id" : data[i].id});
            }
            this.tituluAldatu();
        });
        // this.buscar();
      }
});

// document.getElementById('mostrarVentanaMaterial').addEventListener('click', function() {
//     document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
//     document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'block';
// });

document.getElementById('cerrarVentanaAñadirMaterial').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
});

document.getElementById('fondoOscuroLangile').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentanaAñadir();
    }
});

function ocultarVentanaAñadir() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
}

// Para el segundo POPUP

document.getElementById('mostrarVentanaReservarMaterial').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'block';
});

document.getElementById('cerrarVentanaReservarMaterial').addEventListener('click', function() {
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