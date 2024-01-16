var app = new Vue({
    el: '#app',
    data: {
        bilatu: '',
        izena: "",
        kodea: "",
        aldatu: '',
        datos: [],
        taula: [],
    },
    methods: {
        addDatuak(){
            //
                if(this.izena==""){
                    alert("Datu falta dira")
                }else{
                    var js = JSON.stringify({"izena": this.izena}); 
                    console.log("froga: "+js);
                    fetch('../../talde2erronka2back/Erronka2/public/api/grupos/txertatu', {method: 'POST', body: js, mode: 'no-cors'})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.datos.push({"izena" : this.izena, "langileKop" : "0", "kodea" : data});
                        
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
            //
                }
        },
        abrirPopup(kodea, izena){
            //lodelPopup
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

        aldatuDatuak(){
            var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena}); 
            console.log("froga: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/grupos/editatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        for (let i = 0; i < this.datos.length; i++) {
                            if (this.datos[i].kodea == this.aldatu){
                                this.datos[i].kodea = this.kodea;
                                this.datos[i].izena = this.izena;
                            }
                        }
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
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

        ezabatu(kodea){
            var js = JSON.stringify({"kodea": kodea}); 
            console.log("froga: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/grupos/ezabatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.taula = this.taula.filter(aux => aux.kodea !== kodea);
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
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
        // Código que se ejecuta cuando la instancia Vue se ha montado en el DOM
        console.log('La instancia Vue se ha montado en el DOM.');
        // Puedes realizar operaciones adicionales aquí
        fetch('../../talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET', mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            for (let i = 0; i < data.length; i++) {
                // Obtén la referencia de la tabla por su id
                this.datos.push({"izena" : data[i].izena, "langileKop" : data[i].langileak, "kodea" : data[i].kodea});
            }
        });
        this.buscar();
      }
});


// document.getElementById('mostrarVentanaGrupos').addEventListener('click', function() {
//     document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
//     document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
// });

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