var app = new Vue({
    el: '#app',
    data: {
        historialRoles: [],
        historialProductos: [],
        historialMaterial: [],
        tablas: ['tablaRoles', 'tablaProductos', 'tablaMaterial'],
        botonTabla: "",
        titulua: 'HISTORIAL'
    },
    methods: {
        // Rolen datuak lortzeko metodoa (zein ikasle egon den rol bakoitzean eta zenbat aldiz)
        async tablaRoles() {
          
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/roles/historial`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.historialRoles.push({
                  "izena": data[i].izena + " " + data[i].abizenak,
                  "mota": data[i].mota,
                  "data": data[i].data
                });
              }
          
              this.tituluAldatu();
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Produktuen mugimenduen datuak lortzeko metodoa
        async tablaProductos() {
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/productos/mugimenduguztiak`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.historialProductos.push({
                  "produktua": data[i].produktu_izena,
                  "izena": data[i].izena + " " + data[i].abizenak,
                  "kopurua": data[i].kopurua,
                  "marka": data[i].marka,
                  "data": data[i].data
                });
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Materialaren mugimenduen datuak lortzeko metodoa
        async tablaMaterial() {
            try {
              const response = await fetch(`../../talde2erronka2back/Erronka2/public/api/materiala/mugimenduak`, { method: 'GET' });
          
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
              }
          
              const data = await response.json();
          
              for (let i = 0; i < data.length; i++) {
                this.historialMaterial.push({
                  "material": data[i].materiala,
                  "izena": data[i].izena + " " + data[i].abizenak,
                  "kopurua": data[i].kopurua,
                  "hasiera_data": data[i].hasiera_data,
                  "amaiera_data": data[i].amaiera_data
                });
              }
            } catch (error) {
              console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Sakatzen den botoiaren arabera taula desberdinak bistaratzeko metodoa
        mostrarTablas(tabla){
            this.botonTabla = tabla;
            for (let i = 0; i < this.tablas.length; i++) {
                if(this.tablas[i]==tabla){
                    document.getElementById(tabla).style.display = 'table';
                }else{
                    document.getElementById(this.tablas[i]).style.display = 'none';
                }
                
            }
        },
        // Titulua aldatzeko metodoa
        tituluAldatu(){
            var scriptAnterior = document.getElementById("scriptDinamico");
            if (scriptAnterior) {
                scriptAnterior.remove();
            }
            // Crea un nuevo script y asigna su src según la opción seleccionada
            var nuevoScript = document.createElement("script");
            nuevoScript.id = "scriptDinamico";
            nuevoScript.onload = function() {
                console.log("Script cargado exitosamente");
            };
            nuevoScript.innerHTML = "var menu = new Vue({el: '#menu',data: {titulo: '"+this.titulua+"'},});"; // Asigna el nombre del script según la opción
            // Agrega el nuevo script al cuerpo del documento
            document.body.appendChild(nuevoScript);
        }
    },
    mounted: function(){
        this.tablaRoles();
        this.tablaProductos();
        this.tablaMaterial();
    }
});


