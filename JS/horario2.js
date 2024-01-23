var horario2 = new Vue({
    el: '#horario2',
    data: {
        id : '',
        // eserlekua : '',
        datos: [],
        data : '',
        hasiera_ordua : '',
        amaiera_ordua : '',
        langileDisp: 9,
        // hasiera_ordua_erreala : '',
        // amaiera_ordua_erreala : '',
        izena : '',
        telefonoa : '',
        deskribapena : '',
        // etxekoa : '',
        // prezio_totala : '',
        // id_langilea : '',
        cosos: [
            {
                "orduDif" : '',
                
            },
        ],
        orduak: ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45"],
        taula:[],
    
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
                for (let j = 0; j < this.taula[0].length; j++) {
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
        },

        susto(id){
            alert("Boo! "+id)
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
            fetch('../../talde2erronka2back/Erronka2/public/api/hitzordua/' + this.data, { method: 'GET', mode: 'no-cors'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    // Obtén la referencia de la tabla por su id
                    this.datos.push(data[i]);
                }
                this.taulaSortu();
                this.ordenan(); 
            }); 
        },

        lortuData(){
            var gaur = new Date();
            var urtea = gaur.getFullYear();
            var hilabetea = gaur.getMonth() + 1;
            var eguna = gaur.getDate();
            if (eguna < 10) {
                eguna = '0'+eguna
            }
            if (hilabetea < 10) {
                hilabetea = '0'+hilabetea
            }

            // Dar formato :D
           return urtea+'-'+hilabetea+'-'+eguna;
        }

    },
    watch:{

        data:function(){
            this.datuakLortu();
        },

    },
    mounted: function() {
        this.data = this.lortuData();
      }
});
    // [{"datos": "penelope", "num":3}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": false}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": false}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}],
    // [{"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}, {"visible": true}]
  



    // [{"datos": "penelope", "num":3}, true, true, true, true],
    // [false, true, true, true, true],
    // [false, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],
    // [true, true, true, true, true],



    //Poriaca 1
    // ordenan(){
    //     timeDiff=0;
    //     for(let i = 0; i < this.datos.length; i++) {
    //         orduH = this.datos[i].hasiera_ordua.split(":");
    //         orduA = this.datos[i].amaiera_ordua.split(":");
    //         orduDif = (parseInt(orduA[0]) - parseInt(orduH[0]))*4;
    //         minDif = this.minCalc(orduA[1]) - this.minCalc(orduH[1]);
    //         timeDif = minDif + orduDif;
    //         var js = {"izena": this.datos[i].izena, "deskribapena" : this.datos[i].deskribapena, "orduak" : this.datos[i].hasiera_ordua+"-"+this.datos[i].amaiera_ordua, "timeDif": timeDif, "visible" : true, "id" : this.datos[i].id};
            
    //         for (let j = 0; j < this.aux[0].length; j++) {
    //             for (let k = 0; k < this.aux.length; k++) {
    //                 if ((orduH[0]+":"+orduH[1])==this.orduak[k]) {
    //                     for (let l = 0; l < js.timeDif; l++) {
    //                         if (l==0) {
    //                             this.aux[k+l][j] = js;
    //                             //alert("SI "+"k:"+k+" j:"+j+" l:"+l)
    //                         }else{
    //                             this.aux[k+l][j] = {"visible": false};
    //                             //alert("NO "+"k:"+k+" j:"+j+" l:"+l)
    //                         }
    //                     }
    //                 }
    //             }
    //             break ;
    //         }
    //     }
    //     this.taula = this.aux;

    // },


    //Porsiaca2
    // ordenan(){
    //     timeDiff=0;
    //     for(let i = 0; i < this.datos.length; i++) {
    //         orduH = this.datos[i].hasiera_ordua.split(":");
    //         orduA = this.datos[i].amaiera_ordua.split(":");
    //         orduDif = (parseInt(orduA[0]) - parseInt(orduH[0]))*4;
    //         minDif = this.minCalc(orduA[1]) - this.minCalc(orduH[1]);
    //         timeDif = minDif + orduDif;
    //         var js = {"izena": this.datos[i].izena, "deskribapena" : this.datos[i].deskribapena, "orduak" : this.datos[i].hasiera_ordua+"-"+this.datos[i].amaiera_ordua, "timeDif": timeDif, "visible" : true, "disponible": true, "id" : this.datos[i].id};
            
    //         // for (let j = 0; j < this.aux[0].length; j++) {
    //             for (let k = 0; k < this.aux.length; k++) {
    //                 if ((orduH[0]+":"+orduH[1])==this.orduak[k]) {
    //                     for (let l = 0; l < js.timeDif; l++) {
    //                         for (let j = 0; j < this.aux[0].length; j++) {
    //                             var libre=true;
    //                             for (let m = 0; m < js.timeDif-2; m++) { //el 2 teoricamente es un 0 o a las malas un 1, pero no queria ir, asi q le puse un 2 :D para q vaya con 2, tiene que tener el disponible true
    //                                 if (!this.aux[k+m][j].disponible) {
    //                                     libre = false;
    //                                 }
    //                             }
                                
    //                             if (libre) {
    //                                 if (l==0) {
    //                                     this.aux[k+l][j] = js;
    //                                     //alert("SI "+"k:"+k+" j:"+j+" l:"+l)
    //                                 }else{
    //                                     this.aux[k+l][j] = {"visible": false, "disponible": false};
    //                                     //alert("NO "+"k:"+k+" j:"+j+" l:"+l)
    //                                 }
    //                                 break;
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             // break ;
    //         // }
    //     }
    //     this.taula = this.aux;

    // },