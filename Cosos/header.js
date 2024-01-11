var app = new Vue({
    el: '#app',
    data: {
        titulo: "HOME"
    },
    methods: {
        cambiarTitulo(nuevoValor){
            this.titulo = nuevoValor;
        }
    },
    watch:{
        titulo: function(nuevoValor) {
            fetch(nuevoValor+'.html')
            .then(response => response.text())
            .then(data => {
                // Inserta el contenido de a.html en el div con id "contenidoDeA"
                document.getElementById('orrialdea').innerHTML = data;

                // Elimina el script anterior si existe
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
                nuevoScript.src = "../JS/"+ nuevoValor.toLowerCase() + ".js"; // Asigna el nombre del script según la opción

                // Agrega el nuevo script al cuerpo del documento
                document.body.appendChild(nuevoScript);
            })
            .catch(error => console.error('Error al obtener el contenido:', error));
        }
    }

});

fetch('home.html')
            .then(response => response.text())
            .then(data => {
                // Inserta el contenido de a.html en el div con id "contenidoDeA"
                document.getElementById('orrialdea').innerHTML = data;
            })
            .catch(error => console.error('Error al obtener el contenido:', error));