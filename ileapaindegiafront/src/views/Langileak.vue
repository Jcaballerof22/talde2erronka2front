<script>
import { resolveTransitionHooks } from 'vue';

export default {
    data() {
        return {
            izena: "",
            kodea: "",
            datos: [],
            datosTalde : [],
            abizenak: "",
            bilatu: '',
            aldatu: '',
            sailkatu: "all",
            taula: [],
            izenaT: "",
            kodeaT: "",
            aldatuT: '',
            datosT: [],
            taulaT: [],
        }
    },
    methods: {
        async addDatuak() {
            if (this.abizenak === "" || this.izena === "") {
                alert("Faltan datos");
            } else {
                try {
                    const js = JSON.stringify({
                        "kodea": this.kodea,
                        "izena": this.izena,
                        "abizenak": this.abizenak
                    });
                    console.log("froga: " + js);

                    const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/alumnos/txertatu', {
                        method: 'POST',
                        body: js
                    });

                    const data = await response.text();
                    console.log(data);

                    this.datos.push({
                        "izena": this.izena,
                        "abizenak": this.abizenak,
                        "kodea": this.kodea,
                        "id": data
                    });
                } catch (error) {
                    console.error("Error al añadir datos:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },

        async addDatuakT() {
            if (this.izenaT === "") {
                alert("Falta el dato");
            } else {
                try {
                    const js = JSON.stringify({"izena": this.izenaT}); 
                    console.log("froga: " + js);

                    const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/grupos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'cors'
                    });

                    const data = await response.text();
                    console.log(data);

                    this.datosT.push({
                        "izena": this.izenaT,
                        "langileKop": "0",
                        "kodea": data
                    });
                } catch (error) {
                    console.error("Error al añadir el dato:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },

        // abrirPopupT(kodeaT, izenaT){
        //     this.aldatuT = kodeaT;
        //     this.izenaT = izenaT;
        //     this.kodeaT = kodeaT;
        //     document.getElementById('fondoOscuroGrupos').classList.add('mostrar-fondo');
        //     document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        // },

        abrirPopupT(){
            console.log(this.datosT);
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangileT').style.display = 'block';
        },

        abrirPopupG(kodea,izena){
            this.aldatuT = kodea;
            this.izenaT = izena;
            this.kodeaT = kodea;
            this.ocultarVentanaT();
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        },

        txertatuEdoAldatuT(){
            if(this.aldatuT != ''){
                this.aldatuDatuakT();
            }else{
                this.addDatuakT();
            }
            this.ocultarVentanaG();
            this.abrirPopupT();
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        },

        async aldatuDatuakT() {
            const js = JSON.stringify({"kodea": this.kodeaT, "izena": this.izenaT}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/grupos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                this.datosT = [];
                this.lortuDatuakT();
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        async ezabatuT(kodeaT) {
            const js = JSON.stringify({"kodea": kodeaT}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/grupos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                this.datosT = [];
                this.lortuDatuakT();
                this.ocultarVentanaT();
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        async lortuDatuakT() {
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/grupos', { 
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data); 
                for (let i = 0; i < data.length; i++) {
                    this.datosT.push({
                        "izena": data[i].izena,
                        "langileKop": data[i].langileak,
                        "kodea": data[i].kodea
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos de los grupos:', error);
            }
        },

        ocultarVentanaT() {
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangileT').style.display = 'none';
        },

        async nombresGrupo() {
            this.datosTalde.push({"izena": "All", "kodea": "all"});
            
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/grupos', {
                    method: 'GET'
                });

                const data = await response.json();
                
                console.log(data);
                
                data.forEach(grupo => {
                    this.datosTalde.push({
                        "izena": grupo.izena,
                        "kodea": grupo.kodea
                    });
                });
            } catch (error) {
                console.error('Error al obtener los nombres de grupo:', error);
            }
        },

        abrirPopup(kodea, izena, abizenak, id){
            this.aldatu = id;
            this.izena = izena;
            this.abizenak = abizenak;
            this.kodea = kodea;
            this.id = id;
             
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'block';
        },

        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        },

        async aldatuDatuak() {
            const js = JSON.stringify({
                "kodea": this.kodea,
                "izena": this.izena,
                "id": this.id,
                "abizenak": this.abizenak
            }); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/alumnos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);
                this.datos = [];
                this.datuakLortu();
                this.buscar();
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        ocultarVentana() {
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        },

        ocultarVentanaG() {
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        },

        buscar(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

        async ezabatu(id) {
            const js = JSON.stringify({"id": id});
            console.log("froga: " + js);
            
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/alumnos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

                this.taula = this.taula.filter(aux => aux.id !== id);
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

        async datuakLortu() {
            try {
                const response = await fetch('http://localhost/talde2erronka2back/Erronka2/public/api/alumnos', {
                    method: 'GET'
                });

                const data = await response.json();

                console.log(data);
                data.forEach(alumno => {
                    this.datos.push({
                        "izena": alumno.izena,
                        "abizenak": alumno.abizenak,
                        "kodea": alumno.kodea,
                        "taldea": "",
                        "id": alumno.id
                    });
                });
                for(let i=0; i<this.datos.length;i++){
                    this.datosTalde.forEach(grupo => {
                        if(grupo.kodea === this.datos[i].kodea){
                            this.datos[i].taldea = grupo.izena;
                        }
                    })

                }

                console.log(this.datos);

            } catch (error) {
                console.error('Error al obtener los alumnos:', error);
            }
        },
    },
    watch:{
        bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.startsWith(this.bilatu)){
                        console.log("hoy");
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

        sailkatu: function(){
            if (this.sailkatu == 'all'){
                this.taula = this.datos;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].kodea == this.sailkatu){
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

    },
    mounted: function() {
        this.nombresGrupo().then(()=>{
            this.datuakLortu()
        });
        
        this.lortuDatuakT();
        this.buscar();
      }
}

</script>

<template>
    <div class="contenido" id="orrialdea"></div>
        <div id="fondoOscuroLangile" class="fondo-oculto"></div>
        <!-- Langileen datuak aldatzeko/txertatzeko -->
        <div id="app">
        <div id="ventanaEmergenteLangile" class="ventana-oculta">
            <div class="contenido-ventana">
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaLangile" class="btn x" @click="ocultarVentana()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="mt-5">
                    <label for="mensaje" id="nombreLabelLangile">Nombre</label>
                </div>
                <div class="mt-4">
                    <textarea id="nombreTextoLangile" name="mensaje" rows="1" cols="50" placeholder="Ingresa el nombre aquí" v-model="izena" @keyup="teclado" ></textarea>
                </div>
                <div class="mt-4">
                    <label for="mensaje" id="apellidoLabelLangile">Apellido</label>
                </div>
                <div class="mt-4">
                    <textarea id="apellidoTextoLangile" name="mensaje" rows="1" cols="50" placeholder="Ingresa el apellido aquí" v-model="abizenak" @keyup="teclado" ></textarea>
                </div>
                <div class="mt-1 d-flex p-2" id="gruposLangilea">
                    <label for="mensaje" id="gruposLabelLangile">Grupos</label>
                
                    <select class="form-select combobox mt-4" id="selectorLangilea" aria-label="Default select example" v-model="kodea">
                        <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.kodea">{{ dato.izena }}</option>
                    </select>
                </div>
                <input id="submitLangile" type="submit" class="btn añadir btn-lg mt-4" @click="txertatuEdoAldatu" value="Enviar">
            </div>
        </div>

        <div id="ventanaEmergenteLangileT" class="ventana-oculta">
            <div class="contenido-ventana">
                <div class="input-group-horarios">
                    <button id="mostrarVentanaGrupos" type="button" class="btn añadir btn-lg" @click="abrirPopupG('', '', '')">Añadir Grupo</button>
                    <button type="button" id="cerrarVentanaLangileT" class="btn x" @click="ocultarVentanaT()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Número de alumnos</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in datosT" :key="index" :id="dato.kodea">
                            <td @click="abrirPopupG(dato.kodea, dato.izena)">{{ dato.izena }}</td>
                            <td @click="abrirPopupG(dato.kodea, dato.izena)">{{ dato.langileKop }}</td>
                            <td>
                                <i class="bi bi-trash-fill" @click="ezabatuT(dato.kodea)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="ventanaEmergenteGrupos" class="ventana-oculta">
            <div class="contenido-ventana">
                <div>
                <!-- Editatzeko/Txertatzeko popup-a -->
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaGrupos" class="btn x" @click="ocultarVentanaG()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="mt-2">
                    <label for="mensaje" id="nombreLabelGrupos">Nombre</label>
                </div>
                <div class="mt-4">
                    <textarea id="nombreTextoGrupos" name="mensaje" rows="1" cols="50" placeholder="Ingresa tu mensaje aquí" v-model="izenaT" @keyup="teclado">{{izena}}</textarea>
                </div>
                    <input id="submitGrupo" type="button" class="btn añadir btn-lg mt-4" @click="txertatuEdoAldatuT" value="Enviar">
                
                </div>
            </div>
        </div>

            <!-- Botoiak/Bilatzaileak -->
        <div class="containerPage">
            <div class="input-group">
                <select class="form-select combobox" aria-label="Default select example" style="max-width: 10vw; margin-right: 3vw;" v-model="sailkatu">
                    <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.kodea">{{ dato.izena }}</option>
                </select>
                <input type="text" class="form-control buscar" placeholder="Buscar por nombre" v-model="bilatu">
                <div class="input-group-append">
                  <button id="mostrarVentanaLangile" type="button" class="btn añadir btn-lg" @click="abrirPopup('', '', '', '')">Añadir Alumno</button>
                </div>
                
            </div>
            <!-- Langileen taula erakusteko -->
            <table id="tabla" class="table table-hover table-striped">
                <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <!-- <th scope="col">Grupo</th> -->
                    <th scope="col">Grupos <i @click="abrirPopupT()" class="bi bi-pencil-square"></i></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(dato, index) in taula" :key="index" :id="dato.id">
                        <td @click="abrirPopup(dato.kodea, dato.izena, dato.abizenak, dato.id)">{{dato.izena}} {{dato.abizenak}}</td>
                        <td @click="abrirPopup(dato.kodea, dato.izena, dato.abizenak, dato.id)">{{dato.taldea}}</td>
                        <td>
                            <i class="bi bi-trash-fill" @click="ezabatu(dato.id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
</template>