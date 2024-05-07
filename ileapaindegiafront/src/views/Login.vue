<script>
    export default {
    data() {
        return {
            user: '',
            pass: ''
            };
    },
    methods: {

    }
};
</script>

<template>
    <head>
        <meta charset="UTF-8">
        <title>Proyecto</title>
        <link rel="stylesheet" href="C:\xampp\htdocs\talde2erronka2front\HTML\login\css\styles.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:400,700&display=swap">
    </head>
    <body>
        <form>
            <div class="input-group">
                <div class="tituloLogo">
                    <p class="tituloLog">LOGIN</p>
                    <img class="logo" src="../img/IMP_Logotipoa.png">
                </div>
                <div>
                    <input class="input" required type="text" id="username" v-model="user">
                    <label class="label" for="username">Usuario</label>
                </div>    
                <br>
                <div>
                    <input class="input2" required type="password" id="password" v-model="pass">
                    <label class="label2" for="password">Contraseña</label>
                </div>    
                <button class="acceder" onclick="window.location.href='../../home.html'" type="button">Acceder</button>
            </div>
        </form>
    </body>
</template>