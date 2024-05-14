<script setup>
  import text from "../assets/json/Menu.json";
  import {ref} from "vue";
  const emit = defineEmits(['translate']);
  var hizkuntza =  hizkuntzaLortu();
  function hizkuntzaLortu () {
    var value = sessionStorage.getItem('hizkuntza');
    return value !== null ? value : 'ESP';
  } 
  console.log(hizkuntza);

  
</script>

<template>
  <div id="menu">
    <header>
      <h1 id="titulo">{{ text[hizkuntza]?.[titulua]?.toUpperCase() }}</h1>
      <div class="hroles">
        <p>{{ text[hizkuntza]?.['Limpieza'] }}: Julio</p>
        <p>{{ text[hizkuntza]?.['Mostrador'] }}: Mikel</p>
      </div>
      
      <div class="">
        <div class="text-center">
          <a :href="'login/HTML/login.html'"><img class="logout" src="../IMG/logout.png" alt="logout" onclick="window.location.href='login/HTML/login.html'"></a>
        </div>
        <div class="" style="display: flex;">
            <button class="btn text-center" @click="emit('translate','ESP')">ESP</button>
            <button class="btn text-center" @click="emit('translate','EUS')">EUS</button>
        </div>
      </div>
     
    </header>
    <div class="menu-container" @mouseover="openMenu" @mouseout="closeMenu">
      <div class="menu">
        <ul class="menu-items">
          <a href="/">
            <li>
              <img src="../IMG/home.png" alt="Menu Icon" class="menu-icon">
              <span class="menu-text"><b>{{text[hizkuntza]["Home"]}}</b></span>
            </li>
          </a>
          <a href="productos">
              <li>
                <img src="../IMG/productos.png" alt="Image 1" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Productos"]}}</b></span>
              </li>
            </a>
            <a href="material">
              <li>
                <img src="../IMG/material.png" alt="Image 2" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Material"]}}</b></span>
              </li>
            </a>
            <a href="alumnos">
              <li>
                <img src="../IMG/alumnos.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Alumnos"]}}</b></span>
              </li>
            </a>
            <a href="grupos">
              <li>
                <img src="../IMG/grupos.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Grupos"]}}</b></span>
              </li>
            </a>
            <a href="estadisticas">
              <li>
                <img src="../IMG/estadisticas.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Estadísticas"]}}</b></span>
              </li>
            </a>
            <a href="historial">
              <li>
                <img src="../IMG/historial.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Historial"]}}</b></span>
              </li>
            </a>
            <a href="tratamientos">
              <li>
                <img src="../IMG/3460107.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Tratamientos"]}}</b></span>
              </li>
            </a>
            <a href="tickets">
              <li>
                <img src="../IMG/tikets.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Tickets"]}}</b></span>
              </li>
            </a>
            <a href="fichas">
              <li>
                <img src="../IMG/fichas.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>{{text[hizkuntza]["Fichas"]}}</b></span>
              </li>
            </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      // Titulua aldatzeko
      titulua() {
        const route = this.$router.currentRoute.value;
        return route.meta && route.meta.title ? route.meta.title : 'Pagina sin titulo';
      }
    },
    methods: {
      // Menua funtzionatzeko
      openMenu() {
        var menuContainer = document.querySelector('.menu-container');
        var menuTexts = menuContainer.querySelectorAll('.menu-text');

        menuContainer.style.width = '250px';

        menuTexts.forEach(function (text) {
          text.style.display = 'inline';
        });
      },
      closeMenu() {
        var menuContainer = document.querySelector('.menu-container');
        var menuTexts = menuContainer.querySelectorAll('.menu-text');

        menuContainer.style.width = '100px';

        menuTexts.forEach(function (text) {
          text.style.display = 'none';
        });
      },
      goToLogin() {
        window.location.href = 'login/login';
      }
    }
  };
</script>