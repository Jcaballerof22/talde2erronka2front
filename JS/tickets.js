var app = new Vue({
    el: '#app',
    data: {
        datosTickets: [],
        taula: []
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
                  "id": data[i].id
                });

                this.taula.push({
                    "bezero_izena": data[i].bezero_izena,
                    "data": data[i].data,
                    "tratamendu_izena": data[i].tratamendu_izena,
                    "prezioa": data[i].prezioa,
                    "id": data[i].id
                });
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        async ezabatu(kodea, index) {
            const js = JSON.stringify({"id": kodea}); 
            console.log("froga: " + js);
  
            this.taula.splice(index, 1);
            for (let i = 0; i < this.taula.length; i++) {
                console.log(this.taula[i]);;    
            }
            
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tickets/ezabatu', {
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
        abrirPopup(kodea, izena, abizenak, id){
            //lodelPopup
            this.aldatu = id;
            this.izena = izena;
            this.abizenak = abizenak;
            this.kodea = kodea;
            this.id = id
             
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteTickets').style.display = 'block';
        },
        cerrarPopup(){
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteTickets').style.display = 'none';
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
        // bilatu: function(){
        //     if (this.bilatu == ''){
        //         this.taula = this.datos;
        //     }else{
        //         this.taula = [];
        //         for (let i = 0; i < this.datos.length; i++){
        //             if(this.datos[i].izena.startsWith(this.bilatu)){
        //                 this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
        //             }
        //         }
        //     }
        // },

        // sailkatu: function(){
        //     if (this.sailkatu == 'all'){
        //         this.taula = this.datos;
        //     }else{
        //         this.taula = [];
        //         for (let i = 0; i < this.datos.length; i++){
        //             if(this.datos[i].kodea == this.sailkatu){
        //                 this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
        //             }
        //         }
        //     }
        // }
    },
    mounted: function() {
        this.mostrarTickets();
    }
});

