<script>
    export default {
    data() {
        return {
            user: '',
            pass: '',
            userC: '',
            passC1: '',
            passC2: ''
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
                    document.getElementById('floatingInputLogin').classList.remove('is-invalid');
                    document.getElementById('floatingPasswordLogin').classList.remove('is-invalid');
                    window.location.href='../'
                } else if (data.status == 401){
                    document.getElementById('floatingInputLogin').classList.remove('is-invalid');
                    document.getElementById('floatingPasswordLogin').classList.add('is-invalid');
                } else if (data.status == 404) {
                    document.getElementById('floatingInputLogin').classList.add('is-invalid');
                    document.getElementById('floatingPasswordLogin').classList.add('is-invalid');
                }
  
            } catch (error) {
                console.error("Error al hacer el login:", error);
            }
        },

        async createUser() {

            document.getElementById('floatingPasswordCrear').classList.remove('is-invalid');
            document.getElementById('floatingPassword2Crear').classList.remove('is-invalid');

            if (this.passC1 == this.passC2) {
                const js = JSON.stringify({"user": this.userC, "pass": this.passC1});
                console.log("login: " + js);

                try {
                    const response = await fetch(window.ruta + 'erabiltzaileak/sortu', {
                        method: 'POST',
                        body: js
                    });

                    const data = await response.json();

                    if (data.status == 201){
                        window.alert("Se ha creado el usuario.");
                        document.querySelector('.input-group-login-2').style.display = 'none';
                        document.querySelector('.input-group-login').style.display = 'grid';
                    } else if (data.status == 404){
                        document.getElementById('floatingInputCrear').classList.add('is-invalid');
                    }

                } catch (error) {
                    console.error("Error al hacer el login:", error);
                }
            } else {
                document.getElementById('floatingPasswordCrear').classList.add('is-invalid');
                document.getElementById('floatingPassword2Crear').classList.add('is-invalid');
            }
  
        },

        mostrarCrearCuenta() {
            document.querySelector('.input-group-login').style.display = 'none';
            document.querySelector('.input-group-login-2').style.display = 'grid';
        },

        mostrarLogin() {
            document.querySelector('.input-group-login-2').style.display = 'none';
            document.querySelector('.input-group-login').style.display = 'grid';
        }
    }
};
</script>

<template>
    <body class="body-login">
        <form>
            <div class="input-group-login">
                <div>
                    <p class="titulo-login">LOGIN</p>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInputLogin" placeholder="name@example.com" v-model="user" aria-describedby="validationLoginUser">
                    <label for="floatingInput">Usuario</label>
                    <div id="validationLoginUser" class="invalid-feedback">
                        Usuario incorrecto.
                    </div>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPasswordLogin" placeholder="Password" v-model="pass" aria-describedby="validationLoginPass">
                    <label for="floatingPassword">Contraseña</label>
                    <div id="validationLoginPass" class="invalid-feedback">
                        Contraseña incorrecta.
                    </div>
                </div>
                <button type="button" class="btn btn-success" @click="login()">Iniciar Sesión</button>
                <hr>
                <button type="button" class="btn btn-primary" @click="mostrarCrearCuenta()">Crear una cuenta</button>
            </div>

            <div class="input-group-login-2">
                <div>
                    <p class="titulo-login">CREAR CUENTA</p>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingInputCrear" placeholder="name@example.com" v-model="userC" aria-describedby="validationCrearUser">
                    <label for="floatingInput">Usuario</label>
                    <div id="validationCrearUser" class="invalid-feedback">
                        Este usuario ya está en uso.
                    </div>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPasswordCrear" placeholder="Password" v-model="passC1">
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword2Crear" placeholder="Password" v-model="passC2" aria-describedby="validationCrearPass">
                    <label for="floatingPassword">Repetir contraseña</label>
                    <div id="validationCrearPass" class="invalid-feedback">
                        Las contraseñas no coinciden.
                    </div>
                </div>
                <button type="button" class="btn btn-success" @click="createUser()">Crear Cuenta</button>
                <hr>
                <button type="button" class="btn btn-primary" @click="mostrarLogin()">Iniciar Sesión</button>
            </div>
        </form>
    </body>
</template>


