var app = new Vue({
    el: '#app',
    data: {
        datosTickets: []
    },
    methods: {
        async mostrarTickets() {
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/tickets`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.datosTickets.push({
                  "bezero_izena": data[i].bezero_izena,
                  "data": data[i].data,
                  "tratamendu_izena": data[i].tratamendu_izena,
                  "prezioa": data[i].prezioa,
                });
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
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
        this.mostrarTickets();
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

