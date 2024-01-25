var pinga = new Vue({
    el: '#pinga',
    data: {
        // bilatu: '',
        izena: "",
        etiketa: "",
        // aldatu: '',
        datos: [],
        // taula: [],
        titulua: 'MATERIAL',
    },
    methods: {
        // addDatuak(){
        //     //
        //         if(this.izena==""){
        //             alert("Datu falta dira")
        //         }else{
        //             var js = JSON.stringify({"izena": this.izena}); 
        //             console.log("froga: "+js);
        //             fetch('../../talde2erronka2back/Erronka2/public/api/grupos/txertatu', {method: 'POST', body: js, mode: 'no-cors'})
        //             .then(function (response) {
        //                     return response.text();
        //             })
        //             .then(data=>{
        //                 console.log(data);
        //                 this.datos.push({"izena" : this.izena, "langileKop" : "0", "kodea" : data});
                        
        //             })
        //             .catch(error => {
        //                 console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        //             });
        //         }
        // },
        // abrirPopup(kodea, izena){
        //     //lodelPopup
        //     this.aldatu = kodea;
        //     this.izena = izena;
        //     this.kodea = kodea;
        //     document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
        //     document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        // },

        // txertatuEdoAldatu(){
        //     if(this.aldatu != ''){
        //         this.aldatuDatuak();
        //     }else{
        //         this.addDatuak();
        //     }
        //     document.getElementById('fondoOscuroGrupos').classList.remove('mostrar-fondo');
        //     document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        // },

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

        // ezabatu(kodea){
        //     var js = JSON.stringify({"kodea": kodea}); 
        //     console.log("froga: "+js);
        //     fetch('../../talde2erronka2back/Erronka2/public/api/grupos/ezabatu', {method: 'PUT', body: js})
        //             .then(function (response) {
        //                     return response.text();
        //             })
        //             .then(data=>{
        //                 console.log(data);
        //                 this.taula = this.taula.filter(aux => aux.kodea !== kodea);
        //             })
        //             .catch(error => {
        //                 console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
        //             });
        // },

        // teclado(event){
        //     if(event.key == "Enter"){
        //         this.txertatuEdoAldatu();
        //     }
        // },

        // tituluAldatu(){
        //     var scriptAnterior = document.getElementById("scriptDinamico");
        //     if (scriptAnterior) {
        //         scriptAnterior.remove();
        //     }
        //     // Crea un nuevo script y asigna su src según la opción seleccionada
        //     var nuevoScript = document.createElement("script");
        //     nuevoScript.id = "scriptDinamico";
        //     nuevoScript.onload = function() {
        //         console.log("Script cargado exitosamente");
        //     };
        //     nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});"; // Asigna el nombre del script según la opción
        //     // Agrega el nuevo script al cuerpo del documento
        //     document.body.appendChild(nuevoScript);
        // },
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
                this.datos.push({"etiketa" : data[i].etiketa, "izena" : data[i].izena});
            }
            this.tituluAldatu();
        });
        // this.buscar();
      }
});

document.getElementById('mostrarVentanaMaterial').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'block';
});

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