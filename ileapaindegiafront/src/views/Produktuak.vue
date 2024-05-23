<script>
  import testua from "../assets/json/Produktuak.json";

export default {
    data() {
        return {
            datosKategoria: [],
            datosProduk: [],
            datosEditatu: [],
            taula: [],
            datosC: [],
            bilatu:'',
            kategoriak:'all',
            id:'',
            izena:'',
            marka:'',
            kategoria:'',
            deskribapena:'',
            stock:'',
            izenaC:'',
            kodeaC:'',
            aldatuC:'',
            stock_alerta:'',
            sazkia: [],
            langileak: [],
            langilea:'',
            hizkuntza: 'ESP',
            testua: testua
        };
    },
    methods:{

        hizkuntzaLortu() {
            var value = sessionStorage.getItem('hizkuntza');
            return value !== null ? value : 'ESP';
        },

        // Devuelve todos los productos
        async produktuakGet() {
            try {
              const response = await fetch(window.ruta + 'productos', { method: 'GET' });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              const data = await response.json();
              this.datosProduk = data;
              this.taula = this.datosProduk;
            } catch (error) {
              console.error('Error fetching productos:', error);
            }
          },
        // Devuelve todas las categorias
        async kategoriakGet() {
            try {
              const response = await fetch(window.ruta + 'kategoria', { method: 'GET' });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
        
              const data = await response.json();
              console.log(data);
              this.datosKategoria = data;
              console.log(this.datosKategoria);
            } catch (error) {
              console.error('Error fetching categorias:', error);
            }
        },
        // Para ocultar el pop-up
        ocultarVentana() {
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'none';
        },
        // Para abrir el pop-up con los datos necesarios
        abrirPopup(id){
            this.aldatu=id;
            this.id=id;
            if(id != ''){
                for(let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].id == id){
                        this.izena = this.datosProduk[i].izena;
                        this.marka = this.datosProduk[i].marka;
                        this.kategoria = this.datosProduk[i].id_kategoria;
                        this.deskribapena = this.datosProduk[i].deskribapena;
                        this.stock = this.datosProduk[i].stock;
                        this.stock_alerta = this.datosProduk[i].stock_alerta;
                        
                    }
                }
            }else{
                this.izena = '';
                this.marka = '';
                this.kategoria = '';
                this.deskribapena = '';
                this.stock = '';
                this.stock_alerta = '';
            }
            
            document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'block';
        },
        // Para eliminar productos de la tabla
        async ezabatu(id) {
            const js = JSON.stringify({"id": id}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch(window.ruta + 'productos/ezabatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();
                console.log(data);

            } catch (error) {
                console.error("Error al eliminar el registro:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        // Añadir datos a la tabla de productos
        async addDatuak() {
            if (this.izena === "" || this.marka === "" || this.marka === "" || this.kategoria === "" || this.deskribapena === "" || this.stock === "" || this.stock_alerta === "") {
                alert("Faltan datos");
            } else {
                try {
                    const js = JSON.stringify({
                        "izena": this.izena,
                        "marka": this.marka,
                        "kategoria": this.kategoria,
                        "deskribapena": this.deskribapena,
                        "stock": this.stock,
                        "stock_alerta": this.stock_alerta
                    });

                    const response = await fetch(window.ruta + 'productos/txertatu', {
                        method: 'POST',
                        body: js,
                        mode: 'no-cors'
                    });

                    const data = await response.text();

                    this.datosProduk.push({
                        "izena": this.izena,
                        "marka": this.marka,
                        "kategoria": this.kategoria,
                        "deskribapena": this.deskribapena,
                        "stock": this.stock,
                        "stock_alerta": this.stock_alerta,
                        "id": data
                    });

                } catch (error) {
                    console.error("Error al añadir datos:", error);
                    console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
                }
            }
        },
        // Para saber si tiene que abrir el pop-up para editar o de añadir datos a la tabla
        txertatuEdoAldatu(){
            if(this.aldatu != ''){
                this.aldatuDatuak();
            }else{
                this.addDatuak();
            }
            document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
            document.getElementById('tablaEditarP').style.display = 'none';
        },



        async lortuDatuakC() {
            try {
                // Este es el fetch con la ruta a la api
                const response = await fetch(window.ruta + 'categorias', { 
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);
                // Guardamos los datos recogidos del fetch en el array "datosC" para luego enseñarlos
                for (let i = 0; i < data.length; i++) {
                    this.datosC.push({
                        "izena": data[i].izena,
                        "id": data[i].id
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos de los grupos:', error);
            }
        },





        // Para editar datos de la tabla
        async aldatuDatuak() {

            const js = JSON.stringify({
                "id": this.id,
                "izena": this.izena,
                "marka": this.marka,
                "kategoria": this.kategoria,
                "deskribapena": this.deskribapena,
                "stock": this.stock,
                "stock_alerta": this.stock_alerta
            }); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch(window.ruta + 'productos/editatu', {
                    method: 'PUT',
                    body: js
                });

                const data = await response.text();

                for (let i = 0; i < this.datosProduk.length; i++) {
                    if (this.datosProduk[i].id == this.aldatu) {
                        this.datosProduk[i].izena = this.izena;
                        this.datosProduk[i].marka = this.marka;
                        this.datosProduk[i].kategoria = this.kategoria;
                        this.datosProduk[i].deskribapena = this.deskribapena;
                        this.datosProduk[i].stock = this.stock;
                        this.datosProduk[i].stock_alerta = this.stock_alerta;
                    }
                }
            } catch (error) {
                console.error("Error al editar el dato:", error);
                console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
            }
        },
        // Para añadir productos al carrito
        addKarrito(prod) {
            let aux = false;
            for (let i = 0; i < this.sazkia.length; i++) {
                if (this.sazkia[i].id === prod.id) {
                    this.sazkia[i].kantitatea++;
                    aux = true;
                    alert('Producto añadido al carrito');
                    break;
                }
            }
            if (!aux) {
                this.sazkia.push({
                    'stock': prod.stock,
                    'id': prod.id,
                    'kantitatea': 1,
                    'marka': prod.marka,
                    'izena': prod.izena,
                    'kategoria': prod.kategoria,
                    'id_kategoria': prod.id_kategoria
                });
                alert('Producto añadido al carrito');
            }
        },
        // Para sacar datos del carrito
        removeFromKarrito(index) {
            this.sazkia.splice(index, 1);
            alert('Producto eliminado del carrito');
        },
        // Para añadir los alumnos al dropbox del carrito
        async langileakLortu() {
            const hoy = this.lortuData();
            const url = `${window.ruta}alumnos/`+hoy;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                this.langileak = data;

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        },
        // Para que devuelva el dia en el formato correcto
        lortuData() {
            const gaur = new Date();
            const urtea = gaur.getFullYear();
            const hilabetea = (gaur.getMonth() + 1).toString().padStart(2, '0');  
            const eguna = gaur.getDate().toString().padStart(2, '0'); 
            return `${urtea}-${hilabetea}-${eguna}`;
        },
        // Para sacar productos del almacen
        erosketak() {
            this.sazkia.forEach(element => {
                if (element.stock < element.kantitatea) {
                    alert('No hay stock suficiente del producto');
                } else {
                    this.erosi(element.id, this.langilea, element.kantitatea);
                }
            });
        },
        // Para sacar productos del almacen y se hagan los cambios en la base de datos
        async erosi(id_produktua, id_langilea, kopurua) {
            const js = JSON.stringify({
                'id_produktua': id_produktua,
                'id_langilea': id_langilea,
                'kopurua': kopurua
            });
            console.log('Kompra:', js);
            try {
                const response = await fetch(`${window.ruta}productos/erosi`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: js
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.text();
                console.log('Compra exitosa:', data);
            } catch (error) {
                console.error('Error al realizar la compra:', error);
            }
        },

        
    abrirPopupG(kodea,izena){
        this.aldatuC = kodea;
        this.izenaC = izena;
        this.kodeaC = kodea;
        document.getElementById('fondoOscuro').classList.add('mostrar-fondo');
        document.getElementById('ventanaEmergenteCategorias').style.display = 'block';
    },

    ocultarVentanaC() {
        document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
        document.getElementById('ventanaEmergenteCategorias').style.display = 'none';
    },

    ocultarVentanaCC() {
        document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
        document.getElementById('ventanaEmergenteCategoriasC').style.display = 'none';
    },

    abrirPopupCC(){
        document.getElementById('ventanaEmergenteCategorias').style.display = 'none';
        document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
        document.getElementById('ventanaEmergenteCategoriasC').style.display = 'block';
    },

    async txertatuC(){
        const js = JSON.stringify({"izena": this.izenaC}); 
        try {
            // Este es el fetch con la ruta a la api del back
            const response = await fetch(window.ruta + 'categorias/txertatu', {
                method: 'POST',
                body: js
            });

            const data = await response.text();
            // Vaciamos el array para volver a llenarlo con los datos actualizados
            this.datosC = [];
            this.lortuDatuakC();
            // Llamamos a la funcion que cierra el ultimo POPUP
            this.ocultarVentanaC();
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
        }
        this.ocultarVentanaC();
        this.abrirPopupCC();
        document.getElementById('fondoOscuro').classList.remove('mostrar-fondo');
        document.getElementById('ventanaEmergenteCategoriasC').style.display = 'none';
    },

    async ezabatuC(id) {
        const js = JSON.stringify({"id": id}); 
        console.log(js);
        console.log(this.datosC);
        try {
            // Este es el fetch con la ruta a la api del back
            const response = await fetch(window.ruta + 'categorias/ezabatu', {
                method: 'PUT',
                body: js
            });

            const data = await response.text();
            // Vaciamos el array para volver a llenarlo con los datos actualizados
            this.datosC = [];
            this.lortuDatuakC();
            // Llamamos a la funcion que cierra el ultimo POPUP
            this.ocultarVentanaC();
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
            console.log("El registro ya está siendo utilizado en otra tabla, por lo tanto, no se puede eliminar.");
        }
    },

    },



    // Los filtros por categoria o en el buscador
    watch:{
        bilatu: function(){
            if (this.bilatu == ''){
                this.taula = this.datosProduk;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].izena.startsWith(this.bilatu)){
                        this.taula.push(this.datosProduk[i]);   
                    }
                }
            }
        },

        kategoriak: function(){
            if (this.kategoriak == 'all'){
                this.taula = this.datosProduk;
            }else{
                this.taula = [];
                for (let i = 0; i < this.datosProduk.length; i++){
                    if(this.datosProduk[i].id_kategoria == this.kategoriak){
                        this.taula.push(this.datosProduk[i]);
                    }
                }
            }
        },
    },

    mounted: function() {
        this.hizkuntza = this.hizkuntzaLortu()
        this.langileakLortu();
        this.produktuakGet();
        this.kategoriakGet();
        this.lortuDatuakC();
    }
}

</script>

<template>
        <div class="contenido-productos" id="orrialdea"></div>
        <!--     Botoiak/Filtroak/Saskia     -->
        <div class="col d-flex justify-content-end me-4" id="cesta-productos">
            <button id="but-cesta-productos" data-bs-toggle="modal" data-bs-target="#miModal">
                <i class="bi bi-basket" style="font-size: 30px;"></i>
            </button>
        </div>
        <div class="containerPage-productos">
            <div class="input-group-estadisticas">
                <div class="col">
                    <button type="button" class="btn añadir btn-lg" @click="abrirPopupG('','')" >{{ testua[hizkuntza]?.['EditarCategoria'] }}</button>
                </div>
                <div class="col">
                    <div class="input-group">
                        <div class="dropdown">
                            <select class="form-select" aria-label="Default select example" style="max-width: 15vw; margin-right: 3vw;" v-model="kategoriak">
                                <option value="all">All</option>
                                <option   v-for="(dato,index) in datosKategoria" :key="index" :value="dato.id">{{ dato.izena }}</option>
                            </select>
                        </div>
                        <input type="text" class="form-control buscar ms-2" :placeholder="testua[hizkuntza]?.['BuscarxNombre']" v-model="bilatu">
                        <div class="input-group-append">
                            <button class="btn lupa" type="button">
                                <i class="bi bi-search"></i>
                            </button>
                            <button type="button" class="btn añadir btn-lg" @click="abrirPopup('')">{{ testua[hizkuntza]?.['AñadirProducto'] }}</button>
                        </div>
                    </div>
                </div>
            
        
                <!--    Taula datuekin    -->
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">{{ testua[hizkuntza]?.['Nombre'] }}</th>
                        <th scope="col">{{ testua[hizkuntza]?.['Marca'] }}</th>
                        <th scope="col">{{ testua[hizkuntza]?.['Categoria'] }}</th>
                        <th scope="col">{{ testua[hizkuntza]?.['Descripcion'] }}</th>
                        <th scope="col">{{ testua[hizkuntza]?.['Stock'] }}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dato, index) in taula" :key="index" :id="dato.id">
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}" @click="abrirPopup(dato.id)">{{ dato.izena }}</td>
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}" @click="abrirPopup(dato.id)">{{ dato.marka }}</td>
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}" @click="abrirPopup(dato.id)">{{ dato.kategoria }}</td>
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}" @click="abrirPopup(dato.id)">{{ dato.deskribapena }}</td>
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}" @click="abrirPopup(dato.id)">{{ dato.stock }}</td>
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}" @click="addKarrito(dato)">
                                <i class="bi bi-cart mx-3"></i>
                            </td>
                            <td :style="{'background-color': dato.stock <= dato.stock_alerta ? 'rgb(226, 107, 107)' : ''}">
                                <i class="bi bi-trash-fill" @click="ezabatu(dato.id)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="ventanaEmergenteCategorias" class="ventana-oculta">
            <div class="contenido-ventana">
                <div class="input-group-horarios">
                    <!-- Boton para llamar a la accion y sumar grupos -->
                    <button id="mostrarVentanaCategorias1" type="button" class="btn añadir btn-lg" @click="abrirPopupCC()">{{ testua[hizkuntza]?.['AñadirCategoria'] }}</button>
                    <!-- Boton para cerrar el POPUP -->
                    <button type="button" id="cerrarVentanaCategoria" class="btn x" @click="ocultarVentanaC()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <table id="tabla" class="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th scope="col">{{ testua[hizkuntza]?.['Nombre'] }}</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                        <!-- El for que enseña los datos que estan en "datosT" -->
                        <tr v-for="(dato, index) in datosC" :key="index" :id="dato.id">
                            <td>{{ dato.izena }}</td>
                            <td>
                                <!-- Boton para llamar a la accion de borrar un dato -->
                                <i class="bi bi-trash-fill" @click="ezabatuC(dato.id)"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="ventanaEmergenteCategoriasC" class="ventana-oculta">
            <div class="contenido-ventana">
                <div>
                <div class="input-group-horarios">
                    <button type="button" id="cerrarVentanaCategoria" class="btn x" @click="ocultarVentanaCC()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div class="mt-2">
                    <label for="mensaje" id="nombreLabelCategoria">{{ testua[hizkuntza]?.['Nombre'] }}</label>
                </div>
                <div class="mt-4">
                    <textarea id="nombreTextoCategoria" name="mensaje" rows="1" cols="50" placeholder="Ingresa el nombre de la categoria aquí" v-model="izenaC">{{izenaC}}</textarea>
                </div>
                    <!-- Boton que llama a ala accion para crera o editar el grupo -->
                    <input id="submitCategoria" type="button" class="btn añadir btn-lg mt-4" @click="txertatuC" :value="testua[hizkuntza]?.['Aceptar']">
                
                </div>
            </div>
        </div>

           <!-- Popup txertatu/editatu     -->
        <div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="miModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="miModalLabel">{{ testua[hizkuntza]?.['ProductosSeleccionados'] }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table">
                            <thead class="thead-prod-head">
                                <tr>
                                <th scope="col" class="border-0">
                                    <div class="p-2 px-3 text-uppercase">{{ testua[hizkuntza]?.['Productos'] }}</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 text-uppercase">{{ testua[hizkuntza]?.['Marca'] }}</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 text-uppercase">{{ testua[hizkuntza]?.['Cantidad'] }}</div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 text-uppercase"></div>
                                </th>
                                <th scope="col" class="border-0">
                                    <div class="py-2 text-uppercase"></div>
                                </th>
                                </tr>
                            </thead>
                            <tbody class="taula-pop-produk">
                                <tr v-for="(dato, index) in sazkia" :key="index" :id="dato.kodea">
                                    <th scope="row" id="prod">
                                        <div class="p-2">
                                            <div class="ml-3 d-inline-block align-middle">
                                                <h5 class="mb-0"><a href="#" class="text-dark d-inline-block">{{dato.izena}}</a></h5><span class="text-muted font-weight-normal font-italic">{{dato.kategoria}}</span>
                                            </div>
                                        </div>
                                    </th>
                                    <td>{{dato.marka}}</td>
                                    <td><input type="number" class="form-control text-center" v-model="dato.kantitatea"></td>
                                    <td>
                                        <i class="bi bi-trash-fill" @click="removeFromKarrito(index)"></i>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="col">
                            <select class="form-select" aria-label="Default select example" v-model="langilea">
                                <option   v-for="(dato,index) in langileak" :key="index" :value="dato.id">{{ dato.izena }}</option>
                            </select>
                        </div>
                        <div class="col">
                            <button id="pop-prod" type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="erosketak()">{{ testua[hizkuntza]?.['Aceptar'] }}</button>
                            <button id="pop-prod" type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ testua[hizkuntza]?.['Cerrar'] }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Popup Saskia -->
        <div id="fondoOscuro" class="fondo-oculto" @click="ocultarVentana()"></div>
        <div class="tablaHorarios" id="tablaEditarP">
            <div class="contenidoTablaProd">
                <div class="input-group-horarios">
                    <button type="button" id="cerrarHorarios" class="btn x" @click="ocultarVentana()">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div>
                    <h3 scope="row">{{ testua[hizkuntza]?.['Nombre'] }}</h3>
                    <input type="text" v-model="izena">
                    <h3 scope="row" class="mt-3">{{ testua[hizkuntza]?.['Marka'] }}</h3>
                    <input type="text" v-model="marka">
                    <h3 scope="row" class="mt-3">{{ testua[hizkuntza]?.['Categoria'] }}</h3>
                    <select class="form-select" aria-label="Default select example" style="max-width: 15vw; margin-right: 3vw;" v-model="kategoria">
                        <option   v-for="(dato,index) in datosKategoria" :key="index" :value="dato.id">{{ dato.izena }}</option>
                    </select>
                    <h3 scope="row" class="mt-3">{{ testua[hizkuntza]?.['Descripcion'] }}</h3>
                    <div class="form-floating">
                        <textarea class="form-control" type="text" v-model="deskribapena" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea"></label>
                    </div>
                    <h3 scope="row" class="mt-3">{{ testua[hizkuntza]?.['Stock'] }}</h3>
                    <input type="number" v-model="stock">
                    <h3 scope="row" class="mt-3">{{ testua[hizkuntza]?.['AlertaStock'] }}</h3>
                    <input type="number" v-model="stock_alerta">
                </div>
                <div class="input-group-horarios">
                    <button type="button" id="aceptarHorarios" class="btn añadir btn-lg" @click="txertatuEdoAldatu()">{{ testua[hizkuntza]?.['Aceptar'] }}</button>
                    <button type="button" id="cancelarHorarios" class="btn cancelar btn-lg" @click="ocultarVentana()">{{ testua[hizkuntza]?.['Cancelar'] }}</button>
                </div>
            </div>
        </div>
</template>