var horario2 = new Vue({
    el: '#horario2',
    data: {
        id : '',
        // eserlekua : '',
        bilatu: '',
        bilatusinbol: '',
        data : '',
        datos: [],
        langileDisp: 9,
        lapsoDTiempo: 4, // 2->cada 15 mins, 4->cada 30 mins
        intervaloHoras:[9,14,16,20], //0-1 para la mañana, 2-3 para la tarde
        // hasiera_ordua_erreala : '',
        // amaiera_ordua_erreala : '',
        idCita: '',
        izena : '',
        telefonoa : '',
        deskribapena : '',
        hasiera_ordua : '',
        amaiera_ordua : '',
        etxekoa : false,
        // prezio_totala : '',
        // id_langilea : '',
        cosos: [
            {
                "orduDif" : '',
                
            },
        ],
        orduakG: [],
        orduakA: [],
        orduak: [],
        taula: [],
        libre: [],
        tratamendu: "",
        extra:0,
        tratamenduak: [],
        tratamenduakCita: [],
        tratamenduakCitaText: "",
    
    },
    methods: {
        minCalc(minutua){
            counter=0;
            switch(minutua){
                case '15':
                    counter=+1;
                break;
                case '30':
                    counter=+2;
                    break;
                case '45':
                    counter=+3;
                    break;
                default:

                    break;
            }
            return counter;
        },

        ordenan(){
            timeDiff=0;
            for(let i = 0; i < this.datos.length; i++) {
                orduH = this.datos[i].hasiera_ordua.split(":");
                orduA = this.datos[i].amaiera_ordua.split(":");
                orduDif = (parseInt(orduA[0]) - parseInt(orduH[0]))*4;
                minDif = this.minCalc(orduA[1]) - this.minCalc(orduH[1]);
                timeDif = minDif + orduDif;
                var js = {"izena": this.datos[i].izena, "deskribapena" : this.datos[i].deskribapena, "orduak" : this.datos[i].hasiera_ordua+"-"+this.datos[i].amaiera_ordua, "timeDif": timeDif, "visible" : true, "disponible": false, "id" : this.datos[i].id};
                
                //Bucar sitio
                var sitio = null;
                // console.log("elSitioQToca: "+sitio)
                for (let j = 0; j < this.langileDisp; j++) {
                    for (let k = 0; k < this.taula.length; k++) {
                        if ((orduH[0]+":"+orduH[1])==this.orduak[k] && this.taula[k][j].disponible) {
                            horas2:for (let i = 0; i < js.timeDif; i++) {
                                if (this.taula[k+i][j].disponible) {
                                    sitio = j;
                                }else {
                                    sitio = null;
                                    break horas2;
                                }
                            }
                        }
                    }
                }

                //Colocar en su sitio
                for (let i = 0; i < this.taula.length; i++) {
                    if ((orduH[0]+":"+orduH[1])==this.orduak[i]) {
                        for (let l = 0; l < js.timeDif; l++) {
                            if (l==0) {
                                this.taula[i+l][sitio] = js;
                            }else{
                                this.taula[i+l][sitio] = {"visible": false, "disponible": false};
                            }
                        }
                    }
                }
            }
            //Haye que mirar esto, que no lo entiendo :D
            this.taula = this.taula.map(subarray => subarray.slice().reverse());

        },

        popupCita(id){
            this.idCita = id;
            this.citaTratamenduaLortu();
            for (let i = 0; i < this.datos.length; i++) {
                if (this.datos[i].id==id) {
                    this.izena = this.datos[i].izena;
                    this.telefonoa = this.datos[i].telefonoa;
                    this.deskribapena = this.datos[i].deskribapena;
                    this.hasiera_ordua = this.datos[i].hasiera_ordua;
                    this.amaiera_ordua = this.datos[i].amaiera_ordua;
                    if (this.datos[i].etxekoa == 'E') {
                        this.etxekoa = true;  
                    }else{
                        this.etxekoa = false; 
                    }
                }
                
            }
            document.getElementById('fondoOscuro2').classList.add('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'block';
        },

        taulaSortu(){
            for (let i = 0; i < this.orduak.length; i++) {
                var row =[];
                for (let j = 0; j < this.langileDisp; j++) {
                    row.push({"visible": true, "disponible": true});
                }
                this.taula.push(row) ;   
            }
        },

        datuakLortu(){
            this.datos = [];
            this.taula = [];
            fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/' + this.data + this.bilatusinbol, { method: 'GET', mode: 'no-cors'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    // Obtén la referencia de la tabla por su id
                    this.datos.push(data[i]);
                }
                if (this.bilatusinbol != '+'){
                    this.taulaSortu();
                    this.ordenan(); 
                }else{
                    this.taula = [];
                    for (let i = 0; i < this.datos.length; i++){
                        if(this.datos[i].izena.startsWith(this.bilatu)){
                            this.taula.push({"id" : this.datos[i].id, "data" : this.datos[i].data, "hasiera_ordua" : this.datos[i].hasiera_ordua, "amaiera_ordua" : this.datos[i].amaiera_ordua, "izena" : this.datos[i].izena, "telefonoa" : this.datos[i].telefonoa, "deskribapena" : this.datos[i].deskribapena, "etxekoa" : this.datos[i].etxekoa});
                        }
                    }
                }
            }); 
        },

        lortuData(){
            var gaur = new Date();
            var urtea = gaur.getFullYear();
            var hilabetea = gaur.getMonth() + 1;
            var eguna = gaur.getDate();
            var ordua = gaur.getHours();
            if (eguna < 10) {
                eguna = '0'+eguna
            }
            if (hilabetea < 10) {
                hilabetea = '0'+hilabetea
            }
            if (ordua < this.intervaloHoras[1]) {
                this.orduak = this.orduakG;
            } else {
                this.orduak = this.orduakA;
            }
            // Dar formato :D
            return urtea+'-'+hilabetea+'-'+eguna;
        },

        lortuOrduakG(){
            orduakaux = [this.intervaloHoras[0],this.intervaloHoras[1]]
            orduDif = (orduakaux[1] - orduakaux[0])+1;
            if (this.lapsoDTiempo == 4) {
                for (let i = 0; i < orduDif; i++) {
                    aux = orduakaux[0]+i
                    for (let j = 0; j < 4; j++) {
                        switch(j){
                            case 1:
                                mins = '15';
                                break;
                            case 2:
                                mins = '30';
                                break;
                            case 3:
                                mins = '45';
                                break;
                            default:
                                mins = '00';
                                break;
                        }
                        if (aux < 10) {
                            h = '0' + aux;
                        }else {
                            h = aux;
                        }
                        this.orduakG.push(h + ':' + mins);
                    }
                    
                }
            }else {
                for (let i = 0; i < orduDif; i++) {
                    aux = orduakaux[0]+i;
                    for (let j = 0; j < 2; j++) {
                        if(j == 1){
                            mins = '30';
                        }else{
                            mins = '00';
                        }
                        if (aux < 10) {
                            h = '0' + aux;
                        }else {
                            h = aux;
                        }
                        this.orduakG.push(h + ':' + mins);
                    }
                }
            }
        },

        lortuOrduakA(){
            orduakaux =  [this.intervaloHoras[2],this.intervaloHoras[3]]
            orduDif = (orduakaux[1] - orduakaux[0])+1;
            if (this.lapsoDTiempo == 4) {
                for (let i = 0; i < orduDif; i++) {
                    aux = orduakaux[0]+i
                    for (let j = 0; j < 4; j++) {
                        switch(j){
                            case 1:
                                mins = '15';
                                break;
                            case 2:
                                mins = '30';
                                break;
                            case 3:
                                mins = '45';
                                break;
                            default:
                                mins = '00';
                                break;
                        }
                        if (aux < 10) {
                            h = '0' + aux;
                        }else {
                            h = aux;
                        }
                        this.orduakA.push(h + ':' + mins);
                    }
                    
                }
            }else {
                for (let i = 0; i < orduDif; i++) {
                    aux = orduakaux[0]+i;
                    for (let j = 0; j < 2; j++) {
                        if(j == 1){
                            mins = '30';
                        }else{
                            mins = '00';
                        }
                        if (aux < 10) {
                            h = '0' + aux;
                        }else {
                            h = aux;
                        }
                        this.orduakA.push(h + ':' + mins);
                    }
                }
            }
        },

        async tratamenduakLortu() {
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak', {
                    method: 'GET',
                    mode: 'no-cors'
                });
                
                const data = await response.json();
                
                console.log(data);
                
                // Si `data` es un arreglo, puedes usar `forEach` para iterar sobre él.
                data.forEach(tratamiento => {
                    console.log(tratamiento);
                    // Asumiendo que `this.tratamenduak` está definido fuera de esta función
                    this.tratamenduak.push(tratamiento);
                });
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },

        async citaTratamenduaLortu(){
            this.tratamenduakCitaText = "";
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak/'+this.idCita, {
                    method: 'GET',
                    mode: 'no-cors'
                });
                
                const data = await response.json();
                
                console.log(data);
                
                this.tratamenduakCita = data;
                
                for (let i = 0; i < data.length; i++) {
                    this.tratamenduakCitaText += data[i].tratamenduIzena + " " + data[i].prezioa + " -- ";
                }

            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },
        // Queda x Hacer
        async tratamenduaGehitu(){
            var prezioa = 0;
            if (this.extra == 0) {
                for (let i = 0; i < this.tratamenduak.length; i++) {
                    if (this.tratamenduak[i].id == this.tratamendu) {
                        if(this.etxekoa){
                            prezioa = this.tratamenduak[i].etxeko_prezioa;
                        }else{
                            prezioa = this.tratamenduak[i].kanpoko_prezioa;
                        } 
                    }
                }
            }else{
                prezioa = this.extra;
            }
            var datos = {"id_hitzordua" : this.idCita, "id_tratamendua" : this.tratamendu, "prezioa" : prezioa};
            var js = JSON.stringify(datos); 
            console.log("insert: "+js);

            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak/add', {
                    method: 'POST',
                    mode: 'no-cors',
                    body: js
                });
                
                const data = await response.json();
                
                console.log(data);
                this.citaTratamenduaLortu();
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },

        async tratamenduaKendu(){
            var datos = "";
            for (let i = 0; i < this.tratamenduakCita.length; i++) {
                if (this.tratamenduakCita[i].id_tratamendua == this.tratamendu) {
                    datos = {"id":this.tratamenduakCita[i].id};
                    break;
                }
            }
            
            var js = JSON.stringify(datos); 
            console.log("del: "+js);
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/tratamenduak/remove', {
                    method: 'PUT',
                    body: js
                });
                const data = await response.json();
                console.log(data);
                this.citaTratamenduaLortu();
            } catch (error) {
                console.error('Error al obtener los tratamientos:', error);
            }
        },

        async hitzorduaKendu(){
            const js = JSON.stringify({"id": this.idCita}); 
            console.log("froga: " + js);
            
            try {
                const response = await fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/ezabatu', {
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
            this.quitarFondoNegro();
        },

        quitarFondoNegro(){
            document.getElementById('fondoOscuro2').classList.remove('mostrar-fondo');
            document.getElementById('ventanaEmergenteLangile').style.display = 'none';
        }

    },
    
    watch:{

        data:function(){
            this.datuakLortu();
        },

        bilatu:function(){
            if (this.bilatu == '') {
                this.bilatusinbol = '';
                this.datuakLortu();
            }else{
                this.bilatusinbol = '+';
                this.datuakLortu();
            }
            
        },

        tratamendu: function(){
            this.extra = 0;
        },

    },
    mounted: function() {
        this.lortuOrduakG();
        this.lortuOrduakA();
        this.tratamenduakLortu();
        this.data = this.lortuData();
      }
});

    ////////////////////////////////
    //          30 mins           //
    ////////////////////////////////
    // var horario2 = new Vue({
    //     el: '#horario2',
    //     data: {
    //         orduak: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",],
    //     },
    //     methods: {
    //         minCalc(minutua){
    //             counter=0;
    //             switch(minutua){
    //                 case '30':
    //                     counter=+1;
    //                 break;
    //                 default:
    
    //                     break;
    //             }
    //             return counter;
    //         },
    
    //         ordenan(){
    //             timeDiff=0;
    //             for(let i = 0; i < this.datos.length; i++) {
    //                 orduH = this.datos[i].hasiera_ordua.split(":");
    //                 orduA = this.datos[i].amaiera_ordua.split(":");
    //                 orduDif = (parseInt(orduA[0]) - parseInt(orduH[0]))*2;
    //                 minDif = this.minCalc(orduA[1]) - this.minCalc(orduH[1]);
    //                 timeDif = minDif + orduDif;
    //                 var js = {"izena": this.datos[i].izena, "deskribapena" : this.datos[i].deskribapena, "orduak" : this.datos[i].hasiera_ordua+"-"+this.datos[i].amaiera_ordua, "timeDif": timeDif, "visible" : true, "disponible": false, "id" : this.datos[i].id};
                    
    //                 //Bucar sitio
    //                 var sitio = null;
    //                 // console.log("elSitioQToca: "+sitio)
    //                 for (let j = 0; j < this.taula[0].length; j++) {
    //                     for (let k = 0; k < this.taula.length; k++) {
    //                         if ((orduH[0]+":"+orduH[1])==this.orduak[k] && this.taula[k][j].disponible) {
    //                             horas2:for (let i = 0; i < js.timeDif; i++) {
    //                                 if (this.taula[k+i][j].disponible) {
    //                                     sitio = j;
    //                                 }else {
    //                                     sitio = null;
    //                                     break horas2;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    
    //                 //Colocar en su sitio
    //                 for (let i = 0; i < this.taula.length; i++) {
    //                     if ((orduH[0]+":"+orduH[1])==this.orduak[i]) {
    //                         for (let l = 0; l < js.timeDif; l++) {
    //                             if (l==0) {
    //                                 this.taula[i+l][sitio] = js;
    //                             }else{
    //                                 this.taula[i+l][sitio] = {"visible": false, "disponible": false};
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //     },