var app = new Vue({
    el: '#app',
    data: {
        titulo: "pedro"
    },
    methods: {
        cambiarTitulo(){
            this.titulo = "a";
        }
    },
    watch:{
        titulo: function(nuevoValor) {
            fetch(nuevoValor+'.html')
            .then(response => response.text())
            .then(data => {
                // Inserta el contenido de a.html en el div con id "contenidoDeA"
                document.getElementById('orrialdea').innerHTML = data;
            })
            .catch(error => console.error('Error al obtener el contenido:', error));
        }
    }

});