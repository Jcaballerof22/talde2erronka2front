document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        el: '#app',
        data: {
            taula: [
                { kodea: 1, marca: 'Marca 1', cantidad: 3 },
                { kodea: 2, marca: 'Marca 2', cantidad: 5 },
                // ... Otros datos
            ]
        },
        methods: {
            incrementarCantidad(dato) {
                dato.cantidad++;
            },
            disminuirCantidad(dato) {
                if (dato.cantidad > 0) {
                    dato.cantidad--;
                }
            },
            ezabatu(id) {
                console.log('Eliminando elemento con ID:', id);
            }
        }
    });
});
