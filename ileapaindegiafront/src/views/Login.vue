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
                <div>
                    <h1>LOGIN</h1>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="button" class="btn btn-success">Iniciar Sesión</button>
                <hr>
                <button type="button" class="btn btn-primary">Crear una cuenta</button>
            </div>
        </form>
    </body>
</template>


