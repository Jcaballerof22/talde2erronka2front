var app = new Vue({
    el: '#app',
    data: {
        datosProduk : [],
        titulua: 'PRODUCTOS',
    },

    methods:{
        produktuakGet(){
        fetch('../../talde2erronka2back/Erronka2/public/api/productos', { method: 'GET'})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.length; i++) {
                this.datosProduk.push({"id" : data[i].id, "izena" : data[i].izena, "marka" : data[i].marka, "kategoria" : data[i].kategoria, "deskribapena" : data[i].deskribapena, "stock" : data[i].stock, "stock_alerta" : data[i].stock_alerta});
            }
            console.log(this.datosProduk);
        });
        }
    },
    mounted: function() {
        this.produktuakGet();

    }
});