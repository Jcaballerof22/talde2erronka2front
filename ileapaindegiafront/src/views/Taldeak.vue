<script>
export default{
    data(){
        return{
            bilatu: '',
            izena: "",
            kodea: "",
            aldatu: '',
            datos: [],
            taula: [],
        };
    },
    methods: {
        async addDatuak() {
            if (this.izena === "") {
                alert("Falta el dato");
            } else {
                try {
                    const js = JSON.stringify({"izena": this.izena}); 
                    console.log("froga: " + js);

                    const response = await fetch(window.ruta + 'grupos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'no-cors'
                    });

                    const data = await response.text();
                    console.log(data);

                    this.datos.push({
                        "izena": this.izena,
                        "langileKop": "0",
                        "kodea": data
                    });
                } catch (error) {
                    console.error("Error al añadir el dato:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },

        abrirPopup(kodea, izena){
            this.aldatu = kodea;
            this.izena = izena;
            this.kodea = kodea;
            document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroGrupos').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        },

        async aldatuDatuak() {
            const js = JSON.stringify({"kodea": this.kodea, "izena": this.izena}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch(window.ruta + 'grupos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                for (let i = 0; i < this.datos.length; i++) {
                    if (this.datos[i].kodea === this.aldatu) {
                        this.datos[i].kodea = this.kodea;
                        this.datos[i].izena = this.izena;
                    }
                }
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        
        buscar(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        console.log(this.datos[i].izena + " " + this.datos[i].langileKop+ " " + this.datos[i].kodea)
                        this.taula.push({"izena" : this.datos[i].izena, "langileKop" : this.datos[i].langileKop,  "kodea" : this.datos[i].kodea});
                    }
                }
            }
        },

        async ezabatu(kodea) {
            const js = JSON.stringify({"kodea": kodea}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch(window.ruta + 'grupos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                this.taula = this.taula.filter(aux => aux.kodea !== kodea);
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        teclado(event){
            if(event.key == "Enter"){
                this.txertatuEdoAldatu();
            }
        },

        async lortuDatuak() {
            try {
                const response = await fetch(window.ruta + 'grupos', { 
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data); 
                for (let i = 0; i < data.length; i++) {
                    this.datos.push({
                        "izena": data[i].izena,
                        "langileKop": data[i].langileak,
                        "kodea": data[i].kodea
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos de los grupos:', error);
            }
        },
        
         ocultarVentana() {
            document.getElementById('fondoOscuroGrupos').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        }
        

    },
    watch:{
        bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        console.log(this.datos[i].izena + " " + this.datos[i].langileKop+ " " + this.datos[i].kodea)
                        this.taula.push({"izena" : this.datos[i].izena, "langileKop" : this.datos[i].langileKop,  "kodea" : this.datos[i].kodea});
                    }
                }
            }
        }
    },
    mounted: function() {
        this.lortuDatuak()
        this.buscar();
    }
}

// document.getElementById('cerrarVentanaGrupos').addEventListener('click', function() {
//     ocultarVentana();
// });

// document.getElementById('fondoOscuroGrupos').addEventListener('click', function(event) {
//     if (event.target === this) {
//         ocultarVentana();
//     }
// });

</script>

<template>
<div id="fondoOscuroGrupos" class="fondo-oculto"></div>
        <div id="app">
            <!--   Menua linkatzeko           -->
            <div class="contenido" id="orrialdea"></div>
            <div id="ventanaEmergenteGrupos" class="ventana-oculta">
                <div class="contenido-ventana">
                    <div>
                    <!-- Editatzeko/Txertatzeko popup-a -->
                    <div class="input-group-horarios">
                        <button type="button" id="cerrarVentanaGrupos" class="btn x" @click="ocultarVentana()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="mt-2">
                        <label for="mensaje" id="nombreLabelGrupos">Nombre</label>
                    </div>
                    <div class="mt-4">
                        <textarea id="nombreTextoGrupos" name="mensaje" rows="1" cols="50" placeholder="Ingresa tu mensaje aquí" v-model="izena" @keyup="teclado">{{izena}}</textarea>
                    </div>
                        <input id="submitGrupo" type="button" class="btn añadir btn-lg mt-4" @click="txertatuEdoAldatu" value="Enviar">
                    
                    </div>
                </div>
            </div>
            <div class="containerPage">
                
                <!--     Botoiak/Bilatzailea    -->
                <div class="input-group">
                    <input type="text" class="form-control buscar" placeholder="Buscar por nombre" v-model="bilatu">
                    <div class="input-group-append">
                    <button class="btn lupa" type="button" @click="buscar">
                        <i class="bi bi-search"></i>
                    </button>
                    <button id="mostrarVentanaGrupos" type="button" class="btn añadir btn-lg" @click="abrirPopup('', '', '')">Añadir Grupo</button>
                    </div>
                    
                </div>
                <!--  Taula    -->
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Número de alumnos</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index" :id="dato.kodea">
                            <td @click="abrirPopup(dato.kodea, dato.izena)">{{ dato.izena }}</td>
                            <td @click="abrirPopup(dato.kodea, dato.izena)">{{ dato.langileKop }}</td>
                            <td>
                                <i class="bi bi-trash-fill" @click="ezabatu(dato.kodea)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>