var app = new Vue({
    el: '#app',
    data: {
        datosTickets: [],
        taula: [],
        tratamenduak: [],
        id: '',
        izena: '',
        tratamendu_izena: '',
        prezioa: '',
        id_tratamendua: '',
        data: ''
    },
    methods: {
        // Ticketen datuak lortzeko metodoa
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
        // Ticketak ezabatzeko metodoa
        async ezabatu(kodea, index) {
            const js = JSON.stringify({"id": kodea}); 
            console.log("froga: " + js);
            console.log(index);
  
            this.taula.splice(index, 1);
            for (let i = 0; i < this.taula.length; i++) {
                console.log(this.taula[i].bezero_izena);
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
        // Ticketak editatzeko metodoa
        async aldatuDatuak() {
            for (let i = 0; i < this.tratamenduak.length; i++) {
                if(this.tratamendu_izena == this.tratamenduak[i].izena){
                    this.id_tratamendua = this.tratamenduak[i].id;
                }
            }

            const js = JSON.stringify({"id": this.id, "prezioa": this.prezioa, "id_tratamendua": this.id_tratamendua});
            console.log("froga: " + js);
  
            for (let i = 0; i < this.taula.length; i++) {
              if(this.taula[i].id == this.id){
                this.taula[i].data = this.data;
                this.taula[i].prezioa = this.prezioa;
                this.taula[i].tratamendu_izena = this.tratamendu_izena;
              }
            }
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tickets/editatu', {
                    method: 'PUT',
                    body: js
                });
  
                const data = await response.text();
                console.log(data);
  
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
            this.cerrarPopup();
        },
        // Tratamenduen datuak lortzeko metodoa
        async tratamenduakLortu() {
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak', {
                    method: 'GET',
                    mode: 'no-cors'
                });
                
                const data = await response.json();
                
                data.forEach(tratamiento => {
                    this.tratamenduak.push(tratamiento);
                });
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },
        // POPUPa irekitzeko metodoa
        abrirPopup(index, id){
            if(index !== ''){
                this.id = id;
                this.izena = this.taula[index].bezero_izena;
                this.tratamendu_izena = this.taula[index].tratamendu_izena;
                this.prezioa = this.taula[index].prezioa;
                this.data = this.taula[index].data;
            }
             
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteTickets').style.display = 'block';
        },
        // POPUPa ixteko metodoa
        cerrarPopup(){
            this.id = '';
            this.izena = '',
            this.tratamendu_izena = '',
            this.prezioa = '';
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteTickets').style.display = 'none';
          },
        // buscar(){
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
        this.tratamenduakLortu();
    }
});

