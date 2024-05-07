<script setup>
  import {ref} from "vue";
  import Menu from './components/Menu.vue'
  window.ruta = 'http://localhost/talde2erronka2back/Erronka2/public/api/';
  //Funtzioak
  const translate = (hizkuntza) => {
    sessionStorage.setItem("hizkuntza", hizkuntza);
    window.location.reload();
  }

  const isLoginPage = window.location.pathname.includes('login');

</script>

<template>
  <div>
    <template v-if="!isLoginPage">
      <Menu @translate="translate" @hizkuntzaLortu="hizkuntzaLortu"></Menu>
    </template>
    
    <router-view></router-view>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
