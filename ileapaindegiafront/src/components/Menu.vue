
<template>
  <div id="menu">
    <header>
      <h1 id="titulo">TITULO D:</h1>
      <div class="hroles">
        <p>Mostrador: Julio</p>
        <p>Limpieza: Mikel</p>
      </div>
      <a :href="'login/login'">
        <img class="logout" src="../IMG/logout.png" alt="logout" @click="goToLogin()">
      </a>
    </header>
    <div class="menu-container" @mouseover="openMenu" @mouseout="closeMenu">
      <div class="menu">
        <ul class="menu-items">
          <a href="home">
            <li>
              <img src="../IMG/home.png" alt="Menu Icon" class="menu-icon">
              <span class="menu-text"><b>Home</b></span>
            </li>
          </a>
          <a href="productos">
              <li>
                <img src="../IMG/productos.png" alt="Image 1" class="menu-icon">
                <span class="menu-text"><b>Productos</b></span>
              </li>
            </a>
            <a href="material">
              <li>
                <img src="../IMG/material.png" alt="Image 2" class="menu-icon">
                <span class="menu-text"><b>Material</b></span>
              </li>
            </a>
            <a href="alumnos">
              <li>
                <img src="../IMG/alumnos.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>Alumnos</b></span>
              </li>
            </a>
            <a href="grupos">
              <li>
                <img src="../IMG/grupos.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>Grupos</b></span>
              </li>
            </a>
            <a href="estadisticas">
              <li>
                <img src="../IMG/estadisticas.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>Estadísticas</b></span>
              </li>
            </a>
            <a href="historial">
              <li>
                <img src="../IMG/historial.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>Historial</b></span>
              </li>
            </a>
            <a href="tickets">
              <li>
                <img src="../IMG/tikets.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>Tickets</b></span>
              </li>
            </a>
            <a href="fichas">
              <li>
                <img src="../IMG/fichas.png" alt="Image 3" class="menu-icon">
                <span class="menu-text"><b>Fichas</b></span>
              </li>
            </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
