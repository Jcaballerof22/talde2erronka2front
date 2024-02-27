<script setup>
  import {ref} from "vue";
  import text from './assets/text.json';
  import Menu from './components/Menu.vue'
  //Funtzioak
  function getSessionValue() {
    var value = sessionStorage.getItem('hizkuntza');
    return value !== null ? value : 'ESP'; // Si el valor es null, devuelve 'a'
  } 

  const translate = (hizkuntza) => {
    sessionStorage.setItem("hizkuntza", hizkuntza);
  }

</script>

<template>
  <Menu  @translate = "translate"></Menu>
  <router-view></router-view>
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
