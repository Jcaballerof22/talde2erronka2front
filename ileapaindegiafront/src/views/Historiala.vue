<script>
import testua from "../assets/json/Historiala.json";

export default {
    data() {
        return {
            historialRoles: [],
            historialProductos: [],
            historialMaterial: [],
            taula: [],
            tablas: ['tablaRoles', 'tablaProductos', 'tablaMaterial'],
            botonTabla: "",
            bilatu: "",
            tabla: "historialRoles",
            fechaInicio: '',
            fechaFin: '',
            hizkuntza: 'ESP',
            testua: testua,
        };
    },
    methods:{
        hizkuntzaLortu() {
            var value = sessionStorage.getItem('hizkuntza');
            return value !== null ? value : 'ESP';
        },
        // Rolen datuak lortzeko metodoa (zein ikasle egon den rol bakoitzean eta zenbat aldiz)
        async tablaRoles() {
            try {
                const response = await fetch(window.ruta + `roles/historial`, { method: 'GET' });
            
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

                this.taula = this.historialRoles;
            
            } catch (error) {
                console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Produktuen mugimenduen datuak lortzeko metodoa
        async tablaProductos() {
            try {
                const response = await fetch(window.ruta + `productos/mugimenduguztiak`, { method: 'GET' });
        
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

                this.taula = this.historialProductos;

            } catch (error) {
                console.error('Error al obtener datos del servidor:', error);
            }
        },
        // Materialaren mugimenduen datuak lortzeko metodoa
        async tablaMaterial() {
            try {
                const response = await fetch(window.ruta + `materiala/mugimenduak`, { method: 'GET' });
        
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

                this.taula = this.historialMaterial;

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

            switch (tabla) {
                case 'tablaRoles':
                    this.tabla = 'historialRoles';
                    this.taula = this.historialRoles;
                    break;
                case 'tablaProductos':
                    this.tabla = 'historialProductos';
                    this.taula = this.historialProductos;
                    break;
                case 'tablaMaterial':
                    this.tabla = 'historialMaterial';
                    this.taula = this.historialMaterial;
                    break;
                default:
                    break;
            }
        },

        buscar(){
            let fechaInicio = new Date(this.fechaInicio);
            let fechaFin = new Date(this.fechaFin);
            fechaFin = fechaFin.setDate(fechaFin.getDate() + 1);

            //Egiaztatzen du erabiltzaileak filtroan zerbait idatzi duela
            if (this.bilatu == ''){
                //Erabiltzaileak ez badu ezer idatzi, hasiera eta amaiera data ezarrita daudela egiaztatzen du.
                if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                    this.taula = [];

                //Hasiera eta amaiera data ezarrita badaude, data hoien artean dauden datuak bilatuko ditu.
                switch (this.tabla) {
                    case 'historialRoles':
                        for (let i = 0; i < this.historialRoles.length; i++){
                            if(new Date(this.historialRoles[i].data) >= new Date(this.fechaInicio) && new Date(this.historialRoles[i].data) <= new Date(this.fechaFin)){
                                this.taula.push({"izena" : this.historialRoles[i].izena, "mota" : this.historialRoles[i].mota, "data" : this.historialRoles[i].data});
                            }
                        }
                        break;
                    case 'historialProductos':                    
                        for (let i = 0; i < this.historialProductos.length; i++){
                            if(new Date(this.historialProductos[i].data) >= new Date(this.fechaInicio) && new Date(this.historialProductos[i].data) <= fechaFin){
                                this.taula.push({
                                    "produktua": this.historialProductos[i].produktua,
                                    "izena": this.historialProductos[i].izena,
                                    "kopurua": this.historialProductos[i].kopurua,
                                    "marka": this.historialProductos[i].marka,
                                    "data": this.historialProductos[i].data
                                });
                            }
                        }
                        break;
                    case 'historialMaterial':
                        for (let i = 0; i < this.historialMaterial.length; i++){
                            if(new Date(this.historialMaterial[i].hasiera_data) >= fechaInicio && new Date(this.historialMaterial[i].hasiera_data) <= fechaFin){
                                this.taula.push({
                                    "material": this.historialMaterial[i].material,
                                    "izena": this.historialMaterial[i].izena,
                                    "kopurua": this.historialMaterial[i].kopurua,
                                    "hasiera_data": this.historialMaterial[i].hasiera_data,
                                    "amaiera_data": this.historialMaterial[i].amaiera_data
                                });
                            }
                        }
                        break;
                    default:
                        break;
                }                    
                }else{
                    //Hasiera edo amaiera data ez badaude ezarrita, datu guztiak bistaratuko dira.
                    switch (this.tabla) {
                        case 'historialRoles':
                            this.taula = this.historialRoles;
                            break;
                        case 'historialProductos':
                            this.taula = this.historialProductos;
                            break;
                        case 'historialMaterial':
                            this.taula = this.historialMaterial;
                            break;
                        default:
                            break;
                    }
                }
            }else{
                //Erabiltzaileak filtroan zerbait idatzi badu, idatzitako izenaren arabera bilaketa egingo du.
                this.taula = [];

                switch (this.tabla) {
                    case 'historialRoles':
                        for (let i = 0; i < this.historialRoles.length; i++){
                            if(this.historialRoles[i].izena.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                                if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                                    if(new Date(this.historialRoles[i].data) >= new Date(this.fechaInicio) && new Date(this.historialRoles[i].data) <= new Date(this.fechaFin)){
                                        this.taula.push({"izena" : this.historialRoles[i].izena, "mota" : this.historialRoles[i].mota, "data" : this.historialRoles[i].data});
                                    }
                                }else{
                                    this.taula.push({"izena" : this.historialRoles[i].izena, "mota" : this.historialRoles[i].mota, "data" : this.historialRoles[i].data});
                                }
                            }
                        }
                        break;
                    case 'historialProductos':
                        for (let i = 0; i < this.historialProductos.length; i++){
                            if(this.historialProductos[i].izena.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                                if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                                    if(new Date(this.historialProductos[i].data) >= new Date(this.fechaInicio) && new Date(this.historialProductos[i].data) <= fechaFin){
                                        this.taula.push({
                                            "produktua": this.historialProductos[i].produktua,
                                            "izena": this.historialProductos[i].izena,
                                            "kopurua": this.historialProductos[i].kopurua,
                                            "marka": this.historialProductos[i].marka,
                                            "data": this.historialProductos[i].data
                                        });
                                    }
                                }else{
                                    this.taula.push({
                                        "produktua": this.historialProductos[i].produktua,
                                        "izena": this.historialProductos[i].izena,
                                        "kopurua": this.historialProductos[i].kopurua,
                                        "marka": this.historialProductos[i].marka,
                                        "data": this.historialProductos[i].data
                                    });
                                }
                            }
                        }
                        break;
                    case 'historialMaterial':
                        for (let i = 0; i < this.historialMaterial.length; i++){
                            if(this.historialMaterial[i].izena.toLowerCase().startsWith(this.bilatu.toLowerCase())){
                                if(!isNaN(new Date(this.fechaInicio)) && !isNaN(new Date(this.fechaFin))){
                                    if(new Date(this.historialMaterial[i].hasiera_data) >= new Date(this.fechaInicio) && new Date(this.historialMaterial[i].hasiera_data) <= fechaFin){
                                        this.taula.push({
                                            "material": this.historialMaterial[i].material,
                                            "izena": this.historialMaterial[i].izena,
                                            "kopurua": this.historialMaterial[i].kopurua,
                                            "hasiera_data": this.historialMaterial[i].hasiera_data,
                                            "amaiera_data": this.historialMaterial[i].amaiera_data
                                        });
                                    }
                                }else{
                                    this.taula.push({
                                        "material": this.historialMaterial[i].material,
                                        "izena": this.historialMaterial[i].izena,
                                        "kopurua": this.historialMaterial[i].kopurua,
                                        "hasiera_data": this.historialMaterial[i].hasiera_data,
                                        "amaiera_data": this.historialMaterial[i].amaiera_data
                                    });
                                }
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    },
    watch:{

        //Izenaren arabera filtroa egiteko metodoa
        bilatu: function(){
            this.buscar();
        },

        //Hasiera data aldatzen den bakoitzean funtzioa egingo du.
        fechaInicio: function(){
            this.buscar();
        },

        //Amaiera data aldatzen den bakoitzean funtzioa egingo du.
        fechaFin: function(){
            this.buscar();
        }
    },
    mounted: function(){
        this.hizkuntza = this.hizkuntzaLortu();
        this.tablaRoles();
        this.tablaProductos();
        this.tablaMaterial();
        this.mostrarTablas('tablaRoles');
    }};
</script>

<template>
    <div class="contenido" id="orrialdea"></div>
        <div class="containerPage">
            <!-- Kategoriaren arabera sailkatzeko botoiak -->
            <div class="input-group-estadisticas">
                <div class="col">
                    <button type="button" class="btn añadir btn-lg" @click="mostrarTablas('tablaRoles')">{{testua[hizkuntza]?.['Roles']}}</button>
                    <button type="button" class="btn añadir btn-lg" @click="mostrarTablas('tablaProductos')">{{testua[hizkuntza]?.['Productos']}}</button>
                    <button type="button" class="btn añadir btn-lg" @click="mostrarTablas('tablaMaterial')">{{testua[hizkuntza]?.['Material']}}</button>
                </div>
                <!-- Dataren eta izenaren arabera sailkatzeko atala -->
                <div class="col">
                    <div class="input-group">
                        <div class="me-4">
                            <h4>
                            <input type="date" id="birthday" name="birthday" v-model="fechaInicio">
                            ⇨
                            <input type="date" id="birthday" name="birthday" v-model="fechaFin">
                            </h4>
                        </div>
                        <input type="text" class="form-control buscar" :placeholder="testua[hizkuntza]?.['BuscarxNombre']" v-model="bilatu">
                        <div class="input-group-append">
                            <button class="btn lupa" type="button" @click="lupa">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

<!-- //////////////////////////////////////////////////////////// Rolen taula //////////////////////////////////////////////////////////// -->
                
                <table id="tablaRoles" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">{{testua[hizkuntza]?.['Nombre']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['Rol']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['Fecha']}}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index">
                            <td>{{ dato.izena }}</td>
                            <td v-if="dato.mota=='G'">{{testua[hizkuntza]?.['Limpieza']}}</td>
                            <td v-else>{{testua[hizkuntza]?.['Mostrador']}}</td>
                            <td>{{dato.data}}</td>
                        </tr>
                    </tbody>
                </table>

<!-- //////////////////////////////////////////////////////////// Produktuen taula //////////////////////////////////////////////////////////// -->

                <table id="tablaProductos" class="table table-hover table-striped" style="display: none;">
                    <thead>
                    <tr>
                        <th scope="col">{{testua[hizkuntza]?.['Nombre']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['Producto']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['Cantidad']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['Fecha']}}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index">
                            <td>{{ dato.izena }}</td>
                            <td>{{ dato.produktua }} - {{dato.marka}}</td>
                            <td>{{dato.kopurua}}</td>
                            <td>{{dato.data}}</td>
                        </tr>
                    </tbody>
                </table>
                
<!-- //////////////////////////////////////////////////////////// Materialaren taula //////////////////////////////////////////////////////////// -->

                <table id="tablaMaterial" class="table table-hover table-striped" style="display: none;">
                    <thead>
                    <tr>
                        <th scope="col">{{testua[hizkuntza]?.['Material']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['Nombre']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['FechaInicio']}}</th>
                        <th scope="col">{{testua[hizkuntza]?.['FechaFin']}}</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index">
                            <td>{{ dato.material }}</td>
                            <td>{{ dato.izena }}</td>
                            <td>{{dato.hasiera_data}}</td>
                            <td>{{dato.amaiera_data}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
</template>