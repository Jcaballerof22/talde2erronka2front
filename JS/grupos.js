var app = new Vue({
    el: '#app',
    data: {
        izena: "",
        kodea: "",
        datos: [],
    },
    methods: {
        addDatos(){
            //
                if(this.kodea=="" || this.izena==""){
                    alert("Datu falta dira")
                }else{
                    var js = JSON.stringify({"kodea": this.kodea, "izena": this.izena}); 
                    console.log("froga: "+js);
                    fetch('../../talde2erronka2back/Erronka2/public/api/grupos/txertatu', {method: 'POST', body: js, mode: 'no-cors'})
                    .then(function (response) {
                            return response.text();
                    })
                    .then(data=>{
                        console.log(data);
                        this.datos.push({"izena" : this.izena, "langileKop" : "0"});
                        
                    })
                    .catch(error => {
                        console.log("Erregistro hau beste taula batean erabiltzen ari da, beraz, ezin da ezabatu" + error);
                    });
            //
                }
        },
        abrirPopup(){
            //lodelPopup
        }
    },
    watch:{},
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
                this.datos.push({"izena" : data[i].izena, "langileKop" : data[i].langileak});
            }
        });
      }
});


document.getElementById('mostrarVentanaGrupos').addEventListener('click', function() {
    document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
    document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
});

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