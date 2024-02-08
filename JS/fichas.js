var app = new Vue({
    el: '#app',
    data: {
        datosFichas: [],
        taula: [],
        id: "",
        izena: "",
        abizena: "",
        telefonoa: "",
        azal_sentikorra: "",
        sortze_data: "",
        funtzio: "",
    },
    methods: {
        // Fitxen datuak lortzeko metodoa
        async sacarFichas() {
            try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/fichas', { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                  this.datosFichas.push({"id" : data[i].id, "izena" : data[i].izena, "abizena" : data[i].abizena, "telefonoa" : data[i].telefonoa, "azal_sentikorra" : data[i].azal_sentikorra, "sortze_data" : data[i].sortze_data});
                  this.taula.push({"id" : data[i].id, "izena" : data[i].izena, "abizena" : data[i].abizena, "telefonoa" : data[i].telefonoa, "azal_sentikorra" : data[i].azal_sentikorra, "sortze_data" : data[i].sortze_data});
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Fitxa berria sortzeko edo fitxa bat editatu behar den jakiteko metodoa
        txertatuEdoAldatu(){
          if(this.funtzio == 'aldatu'){
            this.aldatuDatuak();
          }else{
            this.txertatuFichak(); 
          }
        },
        // Fitxa berri bat sortzeko metodoa
        async txertatuFichak() {
          if (this.izena === "") {
              alert("Falta el dato");
          } else {
              try {
                  const js = JSON.stringify({"izena": this.izena, "abizena": this.abizena, "telefonoa": this.telefonoa, "azal_sentikorra": this.azal_sentikorra}); 
                  console.log("froga: " + js);

                  const response = await fetch('../../talde2erronka2back/Erronka2/public/api/fichas/txertatu', {
                      method: 'POST',
                      body: js,
                      mode: 'no-cors'
                  });

                  const data = await response.text();
                  console.log(data);

                  var fecha = new Date();

                  // Data lortu (urtea, hilabetea, eguna, ordua, minutua, segundua)
                  var año = fecha.getFullYear();
                  var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
                  var dia = ('0' + fecha.getDate()).slice(-2);
                  var hora = ('0' + fecha.getHours()).slice(-2);
                  var minuto = ('0' + fecha.getMinutes()).slice(-2);
                  var segundo = ('0' + fecha.getSeconds()).slice(-2);

                  // Data 'yyyy-mm-dd hh:mm:ss' formatuan
                  var fechaFormateada = año + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;

                  var azala = 'E';

                  if(this.azal_sentikorra){
                    azala = 'B';
                  }

                  this.taula.push({"id" : this.id, "izena" : this.izena, "abizena" : this.abizena, "telefonoa" : this.telefonoa, "azal_sentikorra" : azala, "sortze_data" : fechaFormateada});

                  this.cerrarPopup();

              } catch (error) {
                  console.error("Error al añadir el dato:", error);
                  console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
              }
          }
        },
        // Fitxa bat editatzeko metodoa
        async aldatuDatuak() {
          const js = JSON.stringify({"id": this.id, "izena": this.izena, "abizena": this.abizena, "telefonoa": this.telefonoa, "azal_sentikorra": this.azal_sentikorra}); 
          console.log("froga: " + js);

          var azala = 'E';

          if(this.azal_sentikorra){
            azala = 'B';
          }

          for (let i = 0; i < this.taula.length; i++) {
            if(this.taula[i].id == this.id){
              this.taula[i].izena = this.izena;
              this.taula[i].abizena = this.abizena;
              this.taula[i].telefonoa = this.telefonoa;
              this.taula[i].azal_sentikorra = azala;
            }
          }
          
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/fichas/editatu', {
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
        // Fitxa bat ezabatzeko metodoa
        async ezabatu(kodea, index) {
          const js = JSON.stringify({"id": kodea}); 
          console.log("froga: " + js);

          this.taula.splice(index, 1);
          
          try {
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/fichas/ezabatu', {
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
        // POPUPa irekitzeko metodoa
        abrirPopup(kodea, id, funtzio){
            this.funtzio = funtzio;

            if(kodea != ''){
              this.id = id;
              this.izena=this.datosFichas[kodea].izena;
              this.abizena=this.datosFichas[kodea].abizena;
              this.telefonoa=this.datosFichas[kodea].telefonoa;
              if(this.datosFichas[kodea].azal_sentikorra == 'B'){
                this.azal_sentikorra=true;
              }else{
                this.azal_sentikorra=false;
              }
            }
           
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteFichas').style.display = 'block';
        },
        // POPUPa ixteko metodoa
        cerrarPopup(){
          this.izena = '';
          this.abizena = '';
          this.telefonoa = '';
          this.azal_sentikorra = false;
          document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
          document.getElementById('ventanaEmergenteFichas').style.display = 'none';
        },
    },
    
    watch:{

    },
    mounted: function() {
        this.sacarFichas();
      }
});