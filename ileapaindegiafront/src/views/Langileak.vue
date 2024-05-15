<script>
import { resolveTransitionHooks } from 'vue';
import testua from "../assets/json/Langileak.json";

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
            iconVisible: true,
            ////////////////////////////////////////////////////////////// Hizkuntza //////////////////////////////////////////////////////////////
            hizkuntza: 'ESP',
            testua: testua,
        }
    },
    methods: {
        hizkuntzaLortu() {
            var value = sessionStorage.getItem('hizkuntza');
            return value !== null ? value : 'ESP';
        },
        // Funcion para añadir datos de los alumnos a la base de datos, donde primero mira si los datos necesarios estan llenos y despues hace un fetch mandando un JSON al back
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
                    // Este es el fetch con la ruta a la api del back
                    const response = await fetch(window.ruta + 'alumnos/txertatu', {
                        method: 'POST',
                        body: js
                    });

                    const data = await response.text();
                    // Los datos se guardan en el array "datos" para luego utilizarlos mas tarde
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
        // Funcion para añadir datos de los grupos a la base de datos, donde primero mira si estan los datos necesarios y despues hace la llamada al back
        async addDatuakT() {
            if (this.izenaT === "") {
                alert("Falta el dato");
            } else {
                try {
                    const js = JSON.stringify({"izena": this.izenaT}); 
                    // Este es el fetch que hace la llamada al back con su ruta
                    const response = await fetch(window.ruta + 'grupos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'cors'
                    });

                    const data = await response.text();
                    // Guardamos los datos en "datosT" para despues utilizarlos
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
        // La funcion que abre el POPUP "ventanaEmergenteLangileT" 
        abrirPopupT(){
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangileT').style.display = 'block';
        },
        // La funcion que abre el POPUP "ventanaEmergenteGrupos" con los datos necesarios para la edicion
        abrirPopupG(kodea,izena){
            this.aldatuT = kodea;
            this.izenaT = izena;
            this.kodeaT = kodea;
            this.ocultarVentanaT();
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'block';
        },
        // La funcion que cierra el POPUP "ventanaEmergenteLangileT"
        ocultarVentanaT() {
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangileT').style.display = 'none';
        },

        // La funcion que cierra el POPUP "ventanaEmergenteLangile"
        ocultarVentana() {
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        },
        // La funcion que cierra el POPUP "ventanaEmergenteGrupos"
        ocultarVentanaG() {
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteGrupos').style.display = 'none';
        },
        // La funcion que abre el POPUP "ventanaEmergenteLangile" con los datos necesarios para la edicion
        abrirPopup(kodea, izena, abizenak, id){
            this.aldatu = id;
            this.izena = izena;
            this.abizenak = abizenak;
            this.kodea = kodea;
            this.id = id;
             
            document.getElementById('fondoOscuroLangile').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'block';
        },
        // Funcion que diferencia entre la idea del cambio de datos o el añadirlos, despues cerrando el POPUP anterior
        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuroLangile').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        },
        // Funcion que diferencia entre la idea del cambio de datos o el añadirlos, despues cerrando el POPUP anterior
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
        // Funcion que cambia los datos en el back con un fetch, en este caso los datos sobre los grupos
        async aldatuDatuakT() {
            const js = JSON.stringify({"kodea": this.kodeaT, "izena": this.izenaT}); 
            
            try {
                // Este es el fetch que cambia los datos en el back con su ruta a la api
                const response = await fetch(window.ruta + 'grupos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                // Se vacia el array para volver a llenarlos con los datos actualizados
                this.datosT = [];
                this.lortuDatuakT();
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        // Funcion para borrar los datos del back con un fetch, en este caso datos sobre los grupos
        async ezabatuT(kodeaT) {
            const js = JSON.stringify({"kodea": kodeaT}); 
            
            try {
                // Este es el fetch con la ruta a la api del back
                const response = await fetch(window.ruta + 'grupos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                // Vaciamos el array para volver a llenarlo con los datos actualizados
                this.datosT = [];
                this.lortuDatuakT();
                // Llamamos a la funcion que cierra el ultimo POPUP
                this.ocultarVentanaT();
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        // Funcion para conseguir los datos sobre los grupos del back haciendo un fetch
        async lortuDatuakT() {
            try {
                // Este es el fetch con la ruta a la api
                const response = await fetch(window.ruta + 'grupos', { 
                    method: 'GET',
                });
                const data = await response.json();
                // Guardamos los datos recogidos del fetch en el array "datosT" para luego enseñarlos
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


        // Funcion para conseguir los nombres de los grupos y hacer el filtro, usando un fetch
        async nombresGrupo() {
            this.datosTalde.push({"izena": "All", "kodea": "all"});
            
            try {
                // El fetch que hace la llamda al back con su ruta
                const response = await fetch(window.ruta + 'grupos', {
                    method: 'GET'
                });

                const data = await response.json();
                // Guardamos los datos recogidos del fetch en "datosTalde" para luego utilizarlos
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

        // Funcion para cambiar los datos mandando un fetch al back
        async aldatuDatuak() {
            const js = JSON.stringify({
                "kodea": this.kodea,
                "izena": this.izena,
                "id": this.id,
                "abizenak": this.abizenak
            }); 
            
            try {
                // Este es el fetch con su ruta a la api para editar el back
                const response = await fetch(window.ruta + 'alumnos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                // Vaciamos el array para despues llenarlos de los datos actualizados
                this.datos = [];
                this.datuakLortu();
                // Llamamos a la funcion "buscar" para volver a llenar el array "taula" y que se reflejen los cambios en las tablas
                this.buscar();
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        // Funcion para llenar el array "taula" de datos 
        buscar(){
            if (this.bilatu == ''){
                this.taula = this.datos;
            }else{
                // this.taula = [];
                // for (let i = 0; i < this.datos.length; i++){
                //     if(this.datos[i].izena.startsWith(this.bilatu)){
                //         this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                //     }
                // }
            }
        },
        // Funcion para borrar alumnos mandando la id por un fetch al back
        async ezabatu(id) {
            const js = JSON.stringify({"id": id});
            
            try {
                // EL fetch que hace la llamda al back con su ruta a la apu
                const response = await fetch(window.ruta + 'alumnos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                // El filtro que quita el dato que acabamos de borrar del array de datos para enseñar
                this.taula = this.taula.filter(aux => aux.id !== id);
            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },

        // teclado(event){
        //     if(event.key == "Enter"){
        //         this.txertatuEdoAldatu();
        //     }
        // },

        // Funcion para conseguir los datos sobre los alumnos del back con un fetch
        async datuakLortu() {
            try {
                // Este es el fetch que hace la llamada al back
                const response = await fetch(window.ruta + 'alumnos', {
                    method: 'GET'
                });

                const data = await response.json();
                // Guardamos los datos recibidos en el array "datos"
                data.forEach(alumno => {
                    this.datos.push({
                        "izena": alumno.izena,
                        "abizenak": alumno.abizenak,
                        "kodea": alumno.kodea,
                        "taldea": "",
                        "id": alumno.id
                    });
                });
                // Un for que guarda los datos de los grupos en "datosTalde"
                for(let i=0; i<this.datos.length;i++){
                    this.datosTalde.forEach(grupo => {
                        if(grupo.kodea === this.datos[i].kodea){
                            this.datos[i].taldea = grupo.izena;
                        }
                    })

                }
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
                this.taula=[]
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].izena.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                        this.taula.push(this.datos[i]);
                    }
                }
            }
        },
        // Funcion que actualiza la tabla segun lo que este seleccionado en el combobox referenciado con "salkatu"
        sailkatu: function(){
            if (this.sailkatu == 'all'){
                // Metemos los datos en el array "taula" para enseñarlos despues
                this.taula = this.datos;
                // Parametro para habilitar la edicion de los grupos mientras no estemos filtrando
                this.iconVisible = true;
            }else{
                this.taula = [];
                // Parametro para deshabilitar la edicion de los grupos mientras estemos filtrando
                this.iconVisible = false;
                // El filtro que actualiza los datos segun loq ue tengamos seleccionado en el combobox
                for (let i = 0; i < this.datos.length; i++){
                    if(this.datos[i].kodea == this.sailkatu){
                        this.taula.push({"izena" : this.datos[i].izena, "abizenak" : this.datos[i].abizenak, "kodea" : this.datos[i].kodea, "id" : this.datos[i].id});
                    }
                }
            }
        },

    },
    mounted: function() {
        this.hizkuntza = this.hizkuntzaLortu();
        // Las distintas llamadas a las funciones que tienen que ejecutarse al principio
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
        <!-- Fondo oscuro que se utiliza cuando aparece algun POPUP -->
        <div id="fondoOscuroLangile" class="fondo-oculto"></div>
        <div id="app">
        <!-- POPUP para añadir un alumno nuevo -->
        <div id="ventanaEmergenteLangile" class="ventana-oculta">
            <div class="contenido-ventana">
                <div class="input-group-horarios">
                    <!-- Boton para cerrar el POPUP -->
                    <button type="button" id="cerrarVentanaLangile" class="btn x" @click="ocultarVentana()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <!-- Zona para rellenar de datos -->
                <div class="mt-5">
                    <label for="mensaje" id="nombreLabelLangile">{{ testua[hizkuntza]?.['Nombre'] }}</label>
                </div>
                <div class="mt-4">
                    <textarea id="nombreTextoLangile" name="mensaje" rows="1" cols="50" placeholder="Ingresa el nombre aquí" v-model="izena" @keyup="teclado" ></textarea>
                </div>
                <div class="mt-4">
                    <label for="mensaje" id="apellidoLabelLangile">{{ testua[hizkuntza]?.['Apellido'] }}</label>
                </div>
                <div class="mt-4">
                    <textarea id="apellidoTextoLangile" name="mensaje" rows="1" cols="50" placeholder="Ingresa el apellido aquí" v-model="abizenak" @keyup="teclado" ></textarea>
                </div>
                <div class="mt-1 d-flex p-2" id="gruposLangilea">
                    <label for="mensaje" id="gruposLabelLangile">{{ testua[hizkuntza]?.['Grupos'] }}</label>
                    <!-- Selector de grupo con previa llamada al back para los datos de "datosTalde" -->
                    <select class="form-select combobox mt-4" id="selectorLangilea" aria-label="Default select example" v-model="kodea">
                        <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.kodea">{{ dato.izena }}</option>
                    </select>
                </div>
                <!-- Boton para llamar a la accion -->
                <input id="submitLangile" type="submit" class="btn añadir btn-lg mt-4" @click="txertatuEdoAldatu" value="Enviar">
            </div>
        </div>
        <!-- POPUP para los grupos -->
        <div id="ventanaEmergenteLangileT" class="ventana-oculta">
            <div class="contenido-ventana">
                <div class="input-group-horarios">
                    <!-- Boton para llamar a la accion y sumar grupos -->
                    <button id="mostrarVentanaGrupos1" type="button" class="btn añadir btn-lg" @click="abrirPopupG('', '', '')">{{ testua[hizkuntza]?.['AñadirGrupo'] }}</button>
                    <!-- Boton para cerrar el POPUP -->
                    <button type="button" id="cerrarVentanaLangileT" class="btn x" @click="ocultarVentanaT()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">{{ testua[hizkuntza]?.['Nombre'] }}</th>
                        <th scope="col">{{ testua[hizkuntza]?.['NumeroAlumnos'] }}</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <!-- El for que enseña los datos que estan en "datosT" -->
                        <tr v-for="(dato, index) in datosT" :key="index" :id="dato.kodea">
                            <td @click="abrirPopupG(dato.kodea, dato.izena)">{{ dato.izena }}</td>
                            <td @click="abrirPopupG(dato.kodea, dato.izena)">{{ dato.langileKop }}</td>
                            <td>
                                <!-- Boton para llamar a la accion de borrar un dato -->
                                <i class="bi bi-trash-fill" @click="ezabatuT(dato.kodea)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- POPUP de los grupos -->
        <div id="ventanaEmergenteGrupos" class="ventana-oculta">
            <div class="contenido-ventana">
                <div>
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaGrupos" class="btn x" @click="ocultarVentanaG()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="mt-2">
                    <label for="mensaje" id="nombreLabelGrupos">{{ testua[hizkuntza]?.['Nombre'] }}</label>
                </div>
                <div class="mt-4">
                    <textarea id="nombreTextoGrupos" name="mensaje" rows="1" cols="50" placeholder="Ingresa el nombre del grupo aquí" v-model="izenaT" @keyup="teclado">{{izena}}</textarea>
                </div>
                    <!-- Boton que llama a ala accion para crera o editar el grupo -->
                    <input id="submitGrupo" type="button" class="btn añadir btn-lg mt-4" @click="txertatuEdoAldatuT" value="Enviar">
                
                </div>
            </div>
        </div>

        <div class="containerPage">
            <div class="input-group">
                <!-- Combobox para filtrar los datos -->
                <select class="form-select combobox" aria-label="Default select example" style="max-width: 10vw; margin-right: 3vw;" v-model="sailkatu">
                    <option   v-for="(dato,index) in datosTalde" :key="index" :value="dato.kodea">{{ dato.izena }}</option>
                </select>
                <!-- Area de texto para buscar datos -->
                <input type="text" class="form-control buscar" placeholder="Buscar por nombre" v-model="bilatu">
                <div class="input-group-append">
                  <!-- Boton que llama a la accion de abrir el POPUP -->
                  <button id="mostrarVentanaLangile" type="button" class="btn añadir btn-lg" @click="abrirPopup('', '', '', '')">{{ testua[hizkuntza]?.['AñadirAlumno'] }}</button>
                </div>
                
            </div>
            <table id="tabla" class="table table-hover table-striped">
                <thead>
                <tr>
                    <th scope="col">{{ testua[hizkuntza]?.['Nombre'] }}</th>
                    <!-- Icono que llama a la accion de abrir el POPUP de grupos -->
                    <th scope="col" ><i v-show="iconVisible" >{{ testua[hizkuntza]?.['Grupos'] }} <i @click="abrirPopupT()" class="bi bi-pencil-square"></i></i></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    <!-- For para enseñar los datos del array "taula" -->
                    <tr v-for="(dato, index) in taula" :key="index" :id="dato.id">
                        <td @click="abrirPopup(dato.kodea, dato.izena, dato.abizenak, dato.id)">{{dato.izena}} {{dato.abizenak}}</td>
                        <td @click="abrirPopup(dato.kodea, dato.izena, dato.abizenak, dato.id)">{{dato.taldea}}</td>
                        <td>
                            <!-- Boton para llamar a la accion de borrar un dato -->
                            <i class="bi bi-trash-fill" @click="ezabatu(dato.id)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
</template>