document.getElementById('mostrarVentana').addEventListener('click', function() {
    document.getElementById('ventanaEmergente').style.display = 'block';
});

document.getElementById('cerrarVentana').addEventListener('click', function() {
    document.getElementById('ventanaEmergente').style.display = 'none';
});

new Vue({
    el: '#grupoSelect',
    data: {
        selectedOption: null,
        options: ['H56A', 'H56B', 'H56K', 'H56Z']
    },
    methods: {
        selectOption(option) {
            this.selectedOption = option;
        }
    }
});
