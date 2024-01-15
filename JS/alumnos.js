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
        taula: [],
    },
    methods: {
        addDatuak(){
            //
                if(this.abizenak=="" || this.izena==""){
                    alert("Datu falta dira")
                }else{
                    var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena, "abizenak": this.abizenak }); 
                    console.log("froga: "+js);
                    fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/txertatu', {method: 'POST', body: js, mode: 'no-cors'})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.datos.push({"langilea_izena" : this.izena, "langilea_abizenak" : this.abizenak, "taldea_izena" : this.kodea});
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
            //
                }
                
        },
        nombresGrupo(){
            console.log('La instancia Vue se ha montado en el DOM.');
            // Puedes realizar operaciones adicionales aquí
            fetch('../../talde2erronka2back/Erronka2/public/api/grupos', { method: 'GET'})
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                for (let i = 0; i < data.length; i++) {
                    // Obtén la referencia de la tabla por su id
                    this.datosTalde.push({"izena" : data[i].izena, "kodea" : data[i].kodea});
                }
            });
        },

        abrirPopup(langilea_izena, langilea_abizenak, taldea_izena, aldatu){
            //lodelPopup
            this.aldatu = aldatu;
            this.izena = langilea_izena;
            this.abizenak = langilea_abizenak;
            this.taldea_izena = taldea_izena;
             
            document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
        },

        aldatuDatuak(){
            var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena}); 
            console.log("froga: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/editatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        for (let i = 0; i < this.datos.length; i++) {
                            if (this.datos[i].kodea == this.aldatu){
                                this.datos[i].langilea_izena = this.izena;
                                this.datos[i].langilea_abizenak = this.abizenak;
                                for (let j = 0; j < this.datosTalde.length; j++) {
                                    if (this.datosTalde[j].kodea == this.kodea){
                                        this.datos[i].taldea_izena = this.datosTalde[j].kodea;
                                    }
                                }
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
                        for (let j = 0; j < this.datosTalde.length; j++) {
                            if (this.datosTalde[j].kodea == this.kodea){
                                this.taula.push({"langilea_izena" : this.izena, "langilea_abizenak" : this.abizenak, "taldea_izena" : datosTalde[j].kodea,});
                            }
                        }
                    }
                }
            }
        },

        ezabatu(id){
            var js = JSON.stringify({"id": id}); 
            console.log("froga: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/ezabatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.taula = this.taula.filter(aux => aux.id !== id);
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
        }

    },
    watch:{},
    mounted: function() {
        this.nombresGrupo()
        // Código que se ejecuta cuando la instancia Vue se ha montado en el DOM
        console.log('La instancia Vue se ha montado en el DOM.');
        // Puedes realizar operaciones adicionales aquí
        fetch('../../talde2erronka2back/Erronka2/public/api/alumnos', { method: 'GET', mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            for (let i = 0; i < data.length; i++) {
                console.log(data);
                // Obtén la referencia de la tabla por su id
                this.datos.push({"langilea_izena" : data[i].langilea_izena, "langilea_abizenak" : data[i].langilea_abizenak, "taldea_izena" : data[i].taldea_izena});
            }
        });
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