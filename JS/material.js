var pinga = new Vue({
    el: '#pinga',
    data: {
        // bilatu: '',
        izena: "",
        etiketa: "",
        aldatu: '',
        datos: [],
        datosMaterialR: [],
        datosColorMaterialR: [],
        taula: [],
        resultadosCompletos: [],
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
        // async llamarPrimeraFuncion() {
        //   try {
        //     // Lógica para la primera llamada al backend
        //     const response = await fetch('../../talde2erronka2back/Erronka2/public/api/materiala');
        //     const data = await response.json();
    
        //     this.resultadosCompletos = data;
    
        //     // Llamar la segunda función para cada objeto devuelto por la primera llamada
        //     for (const obj of this.resultadosCompletos) {
        //       await this.llamarSegundaFuncion(obj.id);
        //     }
        //   } catch (error) {
        //     console.error('Error en la primera llamada', error);
        //   }
        // },
        // async llamarSegundaFuncion(id) {
        //   try {
        //     // Lógica para la segunda llamada al backend con el "id" proporcionado
        //     const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/materialaR/${id}`);
        //     const data = await response.json();
    
        //     // Unir el resultado al array existente
        //     this.resultadosCompletos = this.resultadosCompletos.concat(data);
        //   } catch (error) {
        //     console.error(`Error en la segunda llamada para id ${id}`, error);
        //   }
        // },
        async fetchData() {
          try {
              console.log('La instancia Vue se ha montado en el DOM.');
      
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/materiala', {
                  method: 'GET',
                  mode: 'no-cors'
              });
      
              const data = await response.json();
      
              console.log(data);
      
              for (let i = 0; i < data.length; i++) {
                  console.log("Entraaaa ");
                  const datosColorMaterialR = await this.segundaLlamada(data[i].id);
      
                  this.datos.push({
                      "etiketa": data[i].etiketa,
                      "izena": data[i].izena,
                      "id": data[i].id,
                      "id_langilea": datosColorMaterialR[0].id_langilea,
                      "amaiera_data": datosColorMaterialR[0].amaiera_data
                  });
              }
      
              this.tituluAldatu();
          } catch (error) {
              console.error('Error al obtener los datos:', error);
              // Aquí puedes manejar el error según tus necesidades
          }
      },
      
          async segundaLlamada(id){
            try {
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/materialaF/'+id, {
                method: 'GET',
                mode: 'no-cors'
            });

              const datosColorMaterialR = await response.json();
              console.log(datosColorMaterialR);
              return datosColorMaterialR;
            
            } catch (error) {
              console.log(error);
              // Maneja el error según tus necesidades
            }
          },

          
        // filtroMaterial(){
        //     var color = "";
        //     console.log("entra");
        //     // this.datosMaterialR.forEach(element => {
        //     //     console.log(" "+element);
        //     //     if (element.amaiera_data == null) {
        //     //         color = 'red';
        //     //     }else{
        //     //         color = 'green';
        //     //     }
        //     //     this.colores.push(color);
        //     // });
        //     console.log(this.datosMaterialR.length)
        //     for (let i = 0; i < this.datosMaterialR.length; i++) {
        //         console.log("yhujrtfg "+this.datosMaterialR[i]);
        //         if (this.datosMaterialR[i].amaiera_data == null) {
        //             color = 'red';
        //         }else{
        //             color = 'green';
        //         }
        //     };
        // },
        
        abrirPopup(etiketa, izena, id){
            
            this.id = id;
            this.aldatu = id;
            this.etiketa = etiketa;
            this.izena = izena;
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteAñadirMaterial').style.display = 'none';
        },

        async aldatuDatuak() {
            try {
              var js = JSON.stringify({
                "etiketa": this.etiketa,
                "izena": this.izena,
                "id": this.id
              });
              console.log("froga: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/materiala/editatu', {
                method: 'PUT',
                body: js
              });
          
              const data = await response.text();
              console.log(data);
          
              for (let i = 0; i < this.datos.length; i++) {
                if (this.datos[i].id == this.aldatu) {
                  this.datos[i].etiketa = this.etiketa;
                  this.datos[i].izena = this.izena;
                }
              }
            } catch (error) {
              console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
              // Maneja el error según tus necesidades
            }
          },

          async ezabatu(id) {
            try {
              var js = JSON.stringify({"id": id}); 
              console.log("frogaBorrar: " + js);
          
              const response = await fetch('../../talde2erronka2back/Erronka2/public/api/materiala/ezabatu', {
                method: 'PUT',
                body: js
              });
          
              const data = await response.text();
              console.log(data);
          
              this.datos = this.datos.filter(aux => aux.id !== id);
            } catch (error) {
              console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
              // Maneja el error según tus necesidades
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
            var nuevoScript = document.createElement("script");
            nuevoScript.id = "scriptDinamico";
            nuevoScript.onload = function() {
                console.log("Script cargado exitosamente");
            };
            nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});";
            document.body.appendChild(nuevoScript);
        },
    },
    mounted: function() {
        
        this.fetchData();
        // this.fetchMaterialR();
        // this.llamarPrimeraFuncion();
      },
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