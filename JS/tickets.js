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
                        this.datos.push({"izena" : this.izena, "abizenak" : this.abizenak, "kodea" : this.kodea, "id" : data});
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
            //
                }
                
        },
        nombresGrupo(){
            this.datosTalde.push({"izena" : "All", "kodea" : "all"});
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

        aldatuDatuak(){
            var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena, "id": this.id, "abizenak": this.abizenak}); 
            console.log("froga: "+js);
            fetch('../../talde2erronka2back/Erronka2/public/api/alumnos/editatu', {method: 'PUT', body: js})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        for (let i = 0; i < this.datos.length; i++) {
                            if (this.datos[i].id == this.aldatu){
                                this.datos[i].izena = this.izena;
                                this.datos[i].abizenak = this.abizenak;
                                this.datos[i].kodea = this.kodea;
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
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
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
        },

        teclado(event){
            if(event.key == "Enter"){
                this.txertatuEdoAldatu();
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
        }
    },
    mounted: function() {
        this.nombresGrupo()
        fetch('../../talde2erronka2back/Erronka2/public/api/alumnos', { method: 'GET', mode: 'no-cors'})
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            for (let i = 0; i < data.length; i++) {
                console.log(data);
                // Obtén la referencia de la tabla por su id
                this.datos.push({"izena" : data[i].izena, "abizenak" : data[i].abizenak, "kodea" : data[i].kodea, "id" : data[i].id});
            }
        });
        this.buscar();
      }
});

// Primer POPUP

document.getElementById('ticket').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteTicket').style.display = 'block';
});

document.getElementById('cerrarVentanaTicket').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteTicket').style.display = 'none';
});

document.getElementById('fondoOscuroLangile').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteTicket').style.display = 'none';
}

// Segundo POPUP  TODAVIA POR ARREGLAR

document.getElementById('ticketMirar').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'block';
});

document.getElementById('cerrarVentanaTicketMirar').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'none';
});

document.getElementById('fondoOscuroLangile').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentanaMirar();
    }
});

function ocultarVentanaMirar() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteLangile').style.display = 'none';
}

// CitasPost

document.getElementById('citasPost').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteCitasPost').style.display = 'block';
});

document.getElementById('cerrarVentanaCitasPost').addEventListener('click', function() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteCitasPost').style.display = 'none';
});

document.getElementById('fondoOscuroLangile').addEventListener('click', function(event) {
    if (event.target === this) {
        ocultarVentana();
    }
});

function ocultarVentana() {
    document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
    document.getElementById('ventanaEmergenteCitasPost').style.display = 'none';
}

$('.clockpicker').clockpicker();