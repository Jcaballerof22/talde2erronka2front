<script>
    export default {
    data() {
        return {
            user: '',
            pass: ''
        };
    },
    methods: {
        async login() {

            const js = JSON.stringify({"user": this.user, "pass": this.pass});
            console.log("login: " + js);
            
            try {
                const response = await fetch(window.ruta + 'erabiltzaileak/login', {
                    method: 'POST',
                    body: js
                });
  
                const data = await response.json();

                if (data.status == 200){
                    console.log("Login zuzena.");
                } else if (data.status == 401){
                    console.log("Pasahitza ez da zuzena.")
                } else if (data.status == 404) {
                    console.log("Ez da erabiltzailea aurkitu.")
                }
  
            } catch (error) {
                console.error("Error al hacer el login:", error);
            }
        }
    }
};
</script>

<template>
    <body class="body-login">
        <form>
            <div class="input-group-login">
                <div class="tituloLogo-login">
                    <p class="tituloLog-login">LOGIN</p>
                    <img class="logo-login" src="../IMG/IMP_Logotipoa.png">
                </div>
                <div>
                    <input class="input-login" required type="text" id="username" v-model="user">
                    <label class="label-login" for="username">Usuario</label>
                </div>    
                <br>
                <div>
                    <input class="input2-login" required type="password" id="password" v-model="pass">
                    <label class="label2-login" for="password">Contraseña</label>
                </div>    
                <button class="acceder-login" @click="login()" type="button">Acceder</button>
            </div>
        </form>
    </body>
</template>